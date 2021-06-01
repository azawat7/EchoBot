const { Collection } = require("discord.js");
const { Client } = require("discord.js");
const { DiscordTogether } = require("discord-together");
const { GiveawaysManager } = require("discord-giveaways");
const { Giveaways } = require("./models/index");
const config = require("./config");
require("dotenv").config();

///////////////////////////////////////////
const client = new Client();

module.exports = client;

// Music
client.queue = new Map();
client.vote = new Map();
// Config
client.config = require("./config");
client.colors = require("./assets/colors.json");
client.emoji = require("./assets/emojis.json");
// Clients
client.discordTogether = new DiscordTogether(client);

///////////////////////////////////////////

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return await Giveaways.find({});
  }

  async saveGiveaway(messageID, giveawayData) {
    await Giveaways.create(giveawayData);
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    await Giveaways.findOneAndUpdate(
      { messageID: messageID },
      giveawayData
    ).exec();
    return true;
  }

  async deleteGiveaway(messageID) {
    await Giveaways.findOneAndDelete({ messageID: messageID }).exec();
    return true;
  }
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    embedColorEnd: "#000000",
    reaction: "🎉",
  },
});

client.giveawaysManager = manager;

///////////////////////////////////////////
require("./util/functions.js")(client);

require("./util/dbFunctions")(client);

///////////////////////////////////////////

["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

///////////////////////////////////////////

client.mongoose = require("./util/mongo");

///////////////////////////////////////////

const { loadCommands, loadEvents } = require("./util/loaders");
loadCommands(client);
loadEvents(client);

///////////////////////////////////////////

///////////////////////////////////////////

console.log("----------------------------");
client.mongoose.init();

client.login(process.env.TOKEN);
