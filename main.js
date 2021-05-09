const { token, prefix } = require("./config")
const { Client, Collection } = require("discord.js");

///////////////////////////////////////////

const client = new Client

///////////////////////////////////////////

client.config = require ("./config")
require("./util/functions")(client);

///////////////////////////////////////////

["commands", "cooldowns"].forEach(x => client[x] = new Collection());

///////////////////////////////////////////

client.mongoose = require("./util/mongo");

///////////////////////////////////////////

const { loadCommands } = require('./handlers/command')
loadCommands(client)

const { loadEvents } = require('./handlers/event')
loadEvents(client)

///////////////////////////////////////////

console.log("----------------------------")
client.mongoose.init();
client.login(token);