const { Client, Collection } = require("discord.js");
const {loadEvents, loadCommands} = require('./util/loader')

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

["commands"].forEach(x => client[x] = new Collection());

loadEvents(client)
loadCommands(client)

/* MongoDB */

client.config = require("./config")
client.mongoose = require("./util/mongo");

/* Bot login */

client.mongoose.init();
client.login(client.config.token);