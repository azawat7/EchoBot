const { token, prefix } = require("./config")
const { Client, Collection } = require("discord.js");

///////////////////////////////////////////

const client = new Client

module.exports = client;

client.config = require ("./config")
client.colors = client.config.colors;

///////////////////////////////////////////

const translate = require('@k3rn31p4nic/google-translate-api')
const db = require('./echoDB')

client.translate = async(text, message) => {
    const lang = await db.has(`lang-${message.guild.id}`) ? await db.get(`lang-${message.guild.id}`) : 'en';
    const traslated = await translate(text, {from: 'en', to: lang});
    return traslated.text;
}

///////////////////////////////////////////

require("./util/functions")(client);

///////////////////////////////////////////

["commands", "cooldowns"].forEach(x => client[x] = new Collection());

///////////////////////////////////////////

client.mongoose = require("./util/mongo");

///////////////////////////////////////////

const { loadCommands } = require('./handlers/command')
loadCommands(client)

const { loadEvents } = require('./handlers/event');
loadEvents(client)

///////////////////////////////////////////

console.log("----------------------------")
client.mongoose.init();
client.login(token);