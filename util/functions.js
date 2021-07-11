const mongoose = require("mongoose");
const { Guild } = require("../models/index");
const { MessageEmbed } = require("discord.js");

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

  client.createUserWarn = async (guild, options = {}) => {
    await Guild.updateOne(
      { guildID: guild.id },
      {
        $push: {
          warnings: {
            target: options.target,
            id: options.id,
            date: options.date,
            moderator: options.mod,
            reason: options.reason,
          },
        },
      }
    ).then();
  };

  client.deleteUserWarn = async (message, id) => {
    await Guild.updateOne(
      { guildID: message.guild.id },
      {
        $pull: {
          warnings: {
            id: id,
          },
        },
      }
    );
  };

  //////////////////////////
  // Level Function
  //////////////////////////

  client.addXp = async (member, guild, xp, info) => {
    await client.updateUserInfo(guild, member, {
      "users.$.level.experience": info.level.experience + parseInt(xp, 10),
      "users.$.level.levels": Math.floor(
        0.1 * Math.sqrt(info.level.experience)
      ),
      "users.$.level.lastUpdated": new Date(),
    });
  };

  client.getUserPosition = async (member, settings) => {
    const data = [];
    settings.users.forEach((user) => {
      data.push({ id: user.id, experience: user.level.experience });
    });

    const sortedArray = data.sort((a, b) => b.experience - a.experience);

    const position = sortedArray.findIndex((i) => i.id === member.id);

    return position + 1;
  };

  // const user = await levels.findOne({
  //   userID: userId,
  //   guildID: guildId,
  // });
  // if (!user) return false;

  // if (fetchPosition === true) {
  //   const leaderboard = await levels
  //     .find({
  //       guildID: guildId,
  //     })
  //     .sort([["xp", "descending"]])
  //     .exec();

  //   user.position = leaderboard.findIndex((i) => i.userID === userId) + 1;
  // }

  // /* To be used with canvacord or displaying xp in a pretier fashion, with each level the cleanXp stats from 0 and goes until cleanNextLevelXp when user levels up and gets back to 0 then the cleanNextLevelXp is re-calculated */
  // user.cleanXp = user.xp - this.xpFor(user.level);
  // user.cleanNextLevelXp = this.xpFor(user.level + 1) - this.xpFor(user.level);

  // return user;
  // };

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

  client.checkMod = (member, modRoles) => {
    for (const role of modRoles) {
      if (member.roles.cache.has(role)) {
        return true;
      }
    }
    return false;
  };

  client.checkAdmin = (member, adminRoles) => {
    for (const role of adminRoles) {
      if (member.roles.cache.has(role)) {
        return true;
      }
    }
    return false;
  };

  client.setSecondTimeout = (callback, seconds) => {
    let msInSeconds = 1 * 1000;

    let secondCount = 0;
    let timer = setInterval(function () {
      secondCount++;

      if (secondCount === seconds) {
        clearInterval(timer);
        callback.apply(this, []);
      }
    }, msInSeconds);
  };

  // client.appendLevel = (userId, guildId, levelss) => {
  //   if (!userId) throw new TypeError("An user id was not provided.");
  //   if (!guildId) throw new TypeError("A guild id was not provided.");
  //   if (!levelss) throw new TypeError("An amount of levels was not provided.");

  //   const user = await levels.findOne({ userID: userId, guildID: guildId });
  //   if (!user) return false;

  //   user.level += parseInt(levelss, 10);
  //   user.xp = user.level * user.level * 100;
  //   user.lastUpdated = new Date();

  //   user.save().catch((e) => console.log(`Failed to append level: ${e}`));

  //   return user;
  // };

  // client.setXp = (userId, guildId, xp) => {
  //   if (!userId) throw new TypeError("An user id was not provided.");
  //   if (!guildId) throw new TypeError("A guild id was not provided.");
  //   if (xp == 0 || !xp || isNaN(parseInt(xp)))
  //     throw new TypeError("An amount of xp was not provided/was invalid.");

  //   const user = await levels.findOne({ userID: userId, guildID: guildId });
  //   if (!user) return false;

  //   user.xp = xp;
  //   user.level = Math.floor(0.1 * Math.sqrt(user.xp));
  //   user.lastUpdated = new Date();

  //   user.save().catch((e) => console.log(`Failed to set xp: ${e}`));

  //   return user;
  // };

  // client.setLevel = (userId, guildId, level) => {
  //   if (!userId) throw new TypeError("An user id was not provided.");
  //   if (!guildId) throw new TypeError("A guild id was not provided.");
  //   if (!level) throw new TypeError("A level was not provided.");

  //   const user = await levels.findOne({ userID: userId, guildID: guildId });
  //   if (!user) return false;

  //   user.level = level;
  //   user.xp = level * level * 100;
  //   user.lastUpdated = new Date();

  //   user.save().catch((e) => console.log(`Failed to set level: ${e}`));

  //   return user;
  // };

  // client.fetchLeaderboard = (guildId, limit) => {
  //   if (!guildId) throw new TypeError("A guild id was not provided.");
  //   if (!limit) throw new TypeError("A limit was not provided.");

  //   var users = await levels
  //     .find({ guildID: guildId })
  //     .sort([["xp", "descending"]])
  //     .exec();

  //   return users.slice(0, limit);
  // };

  // client.computeLeaderboard = (client, leaderboard, fetchUsers = false) => {
  //   if (!client) throw new TypeError("A client was not provided.");
  //   if (!leaderboard) throw new TypeError("A leaderboard id was not provided.");

  //   if (leaderboard.length < 1) return [];

  //   const computedArray = [];

  //   if (fetchUsers) {
  //     for (const key of leaderboard) {
  //       const user = (await client.users.fetch(key.userID)) || {
  //         username: "Unknown",
  //         discriminator: "0000",
  //       };
  //       computedArray.push({
  //         guildID: key.guildID,
  //         userID: key.userID,
  //         xp: key.xp,
  //         level: key.level,
  //         position:
  //           leaderboard.findIndex(
  //             (i) => i.guildID === key.guildID && i.userID === key.userID
  //           ) + 1,
  //         username: user.username,
  //         discriminator: user.discriminator,
  //       });
  //     }
  //   } else {
  //     leaderboard.map((key) =>
  //       computedArray.push({
  //         guildID: key.guildID,
  //         userID: key.userID,
  //         xp: key.xp,
  //         level: key.level,
  //         position:
  //           leaderboard.findIndex(
  //             (i) => i.guildID === key.guildID && i.userID === key.userID
  //           ) + 1,
  //         username: client.users.cache.get(key.userID)
  //           ? client.users.cache.get(key.userID).username
  //           : "Unknown",
  //         discriminator: client.users.cache.get(key.userID)
  //           ? client.users.cache.get(key.userID).discriminator
  //           : "0000",
  //       })
  //     );
  //   }

  //   return computedArray;
  // };

  // client.xpFor = (targetLevel) => {
  //   if (isNaN(targetLevel) || isNaN(parseInt(targetLevel, 10)))
  //     throw new TypeError("Target level should be a valid number.");
  //   if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10);
  //   if (targetLevel < 0)
  //     throw new RangeError("Target level should be a positive number.");
  //   return targetLevel * targetLevel * 100;
  // };
  client.isGiveawayEnded = async (guildid, giveawayid) => {
    const guild = await Guild.findOne({
      guildID: guildid,
    });
    const g = guild.giveaways.filter((gi) => gi.messageID === giveawayid);
    if (g[0].ended) {
      return true;
    } else {
      return false;
    }
  };
};
