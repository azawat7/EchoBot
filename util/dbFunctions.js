const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = (client, message) => {
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
    if (!data) {
      const newGuild = {
        guildID: guild.id,
        guildName: guild.name,
      };

      await client.createGuild(newGuild);
      return;
    }
    if (data) return data;
    return client.config.DEFAULTSETTINGS;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.getUser = async (member) => {
    const data = await client.getGuild(member.guild);
    const position = data.users.map((e) => e.id).indexOf(member.id);
    return data.users[position];
  };

  client.updateUserInfo = (guild, member, options = {}) => {
    Guild.updateOne(
      { guildID: guild.id, "users.id": member.id },
      { $set: options }
    ).then();
  };
};
