const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = async (client) => {
  // Guild Function

  client.createGuild = async (guild) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save();
  };

  client.deleteGuild = async (guild) => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) {
      await data.delete();
    }
  };

  client.getGuild = async (guild) => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) {
      return data;
    } else {
      return;
    }
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
};
