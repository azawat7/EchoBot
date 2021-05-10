const { reconDB } = require('reconlx');
const client = require('./main')

const db = new reconDB(client, {
    uri: "mongodb+srv://root:THr42F1tVuHqsOVe@echo-bot.b6y3f.mongodb.net/EchoDB?retryWrites=true&w=majority",
});

module.exports = db;