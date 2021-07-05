const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = (client) => {
  //////////////////////////
  // Guild DB Function
  //////////////////////////

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

      return await client.createGuild(newGuild);
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

  //////////////////////////
  // User DB Function
  //////////////////////////

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

  client.createUserWarn = async (guild, member, options = {}) => {
    await Guild.updateOne(
      { guildID: guild.id, "users.id": member.id },
      {
        $push: {
          warns: {
            id: options.id,
            date: options.date,
            moderator: options.mod,
            reason: options.reason,
          },
        },
      }
    ).then((d) => console.log(`Warn : ${d}`));
    console.log(options);
  };

  client.deleteUserWarn = async (guild, member, id) => {
    Guild.updateOne(
      { guildID: guild.id, "users.id": member.id },
      {
        $pull: {
          warns: {
            id: id,
          },
        },
      }
    );
  };

  //////////////////////////
  // String Function
  //////////////////////////

  client.formatBytes = (bytes) => {
    if (bytes === 0) return "0 -_- 0";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };
  client.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1);
  };

  client.randomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
};
