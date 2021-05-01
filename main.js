const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents} = require("./util/loader");

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

["commands", "cooldowns"].forEach(x => client[x] = new Collection());

client.config = require("./config")

loadCommands(client);
loadEvents(client);

client.login(client.config.token);