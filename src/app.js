require("dotenv").config();
const sipgate = require("./sipgate");
const gTTS = require("gtts");
const { FaxStatus } = require("sipgateio");
const fs = require("fs");

async function run() {
    const allSms = await sipgate.getSmsByDate(new Date(2021,1,1), new Date(2021,5,1));
    const convertedIdList = [];
    const smsContentList = allSms.filter(sms => {
        if (convertedIdList.includes(sms.id)) {
            return false;
        }
        return true;
    }).map(sms => {
        console.log(sms)

        convertedIdList.push(sms.id);

        let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let smsDate = sms.created.toLocaleString('de-DE', dateOptions)

        return `Nachricht von: ${sms.sourceAlias} vom Datum: ${smsDate} mit dem Nachrichteninhalt: ${sms.smsContent}`
    });

    const outputPath = __dirname + '/../output'
    console.log(smsContentList)
    fs.mkdir(outputPath, function () {})
    smsContentList.forEach((sms,i) => {
        const gtts = new gTTS(sms, "de");
        gtts.save(`${outputPath}/Sms_${i}.mp3`, function (err, result) {
            if(err) { throw new Error(err) }
        });
    })
}

run().catch(console.error);