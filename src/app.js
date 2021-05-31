require('dotenv').config();
const path = require('path');
const sipgate = require('./sipgate');
const GTTS = require('gtts');
const fs = require('fs');

const outputPath = path.join(__dirname, '/../output');

async function run() {
    createOutputPath();

    const startDate = '2021-05-01';
    const endDate = '2021-05-31';

    if (!validateDate(startDate) || !validateDate(endDate)) {
        console.log('Please provide all dates in ISO8601 format: YYYY-MM-DD');
        return;
    }

    const allSms = await sipgate.getSmsByDate(
        new Date(startDate),
        new Date(endDate)
    );
    const convertedIdList = [];
    allSms
        .filter((sms) => {
            if (convertedIdList.includes(sms.id)) {
                return false;
            }
            return true;
        })
        .forEach((sms, i) => {
            convertedIdList.push(sms.id);

            const dateOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };

            const smsDate = sms.created.toLocaleDateString(
                'de-DE',
                dateOptions
            );
            const output = `Nachricht von: ${sms.sourceAlias} vom Datum: ${smsDate} mit dem Nachrichteninhalt: ${sms.smsContent}`;

            const gtts = new GTTS(output, 'de');
            gtts.save(`${outputPath}/Sms_${i}.mp3`, function (err, result) {
                if (err) {
                    throw new Error(err);
                }
            });

            console.log(output);
        });
}

function createOutputPath() {
    if (!fs.existsSync(outputPath)) {
        fs.mkdir(outputPath, (err, result) => {
            if (err) {
                throw new Error(err);
            }
        });
    }
}

function validateDate(date) {
    return date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
}

run().catch(console.error);
