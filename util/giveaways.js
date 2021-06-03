const { GiveawaysManager } = require("discord-giveaways");
const { Giveaways } = require("../models/index");

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

module.exports = GiveawayManagerWithOwnDatabase;
