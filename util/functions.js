const mongoose = require("mongoose");
const { Guild, User } = require("../models/index");

module.exports = async client => {

// Guild Function

  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save()
  };

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return client.config.DEFAULTSETTINGS;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if(data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
}