const { HistoryDirection } = require('sipgateio/dist/history/history.types');
const { sipgateIO, createHistoryModule } = require('sipgateio');

const tokenId = process.env.SIPGATE_TOKEN_ID;
const token = process.env.SIPGATE_TOKEN;

if (!tokenId || !token) {
    throw Error('Please provide a valid sipgate TokenID and Token.');
}

const client = sipgateIO({ tokenId, token });
const historyModule = createHistoryModule(client);

const getAllSms = async () => {
    return await historyModule.fetchAll({
        types: 'SMS',
    });
};

const getSmsByDate = async (startDate, endDate) => {
    return await historyModule.fetchAll({
        types: 'SMS',
        directions: [HistoryDirection.OUTGOING],
        startDate: startDate,
        endDate: endDate,
    });
};

module.exports = {
    getAllSms,
    getSmsByDate,
};
