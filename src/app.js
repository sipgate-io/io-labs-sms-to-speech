require('dotenv').config();
const path = require('path');
const sipgate = require('./sipgate');
const GTTS = require('gtts');
const fs = require('fs');

const outputPath = path.join(__dirname, '/../output');

async function run() {
    createOutputPath();

    const startDate = '2021-05-01';
    const endDate = '2021-06-02';

    if (!validateDate(startDate) || !validateDate(endDate)) {
        console.log('Please provide all dates in ISO8601 format: YYYY-MM-DD');
        return;
    }

    const allSmsByDate = await sipgate.getSmsByDate(
        new Date(startDate),
        new Date(endDate)
    );
    const convertedIdList = [];
    allSmsByDate
        .filter((sms) => !convertedIdList.includes(sms.id))
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

            convertToSpeech(output, `${outputPath}/Sms_${i}.mp3`);

            console.log(output);
        });
}

function convertToSpeech(text, path){
    const gtts = new GTTS(text, 'de');
    gtts.save(path, function (err, result) {
        if (err) {
            throw new Error(err);
        }
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
