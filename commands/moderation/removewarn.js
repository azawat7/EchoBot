const { MessageEmbed } = require("discord.js");
const { Guild } = require("../../models/index");
const r = require("replacer-js");

module.exports.help = {
  name: "removewarn",
  aliases: [
    "rmvwarn",
    "rvmwarns",
    "remove-warn",
    "remove-warns",
    "removewarns",
  ],
  category: "moderation",
  expectedArgs: "`<id>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: true,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "❗❌",
  // hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  const id = args[0];

  const gd = await Guild.findOne({ guildID: message.guild.id });

  if (gd.warnings.length === 0) {
    return message.channel.sendErrorMessage(language.GUILD);
  }

  i = 0;

  gd.warnings.forEach((warn) => {
    i++;
    if (warn.id == id) {
      message.channel.sendSuccessMessage(
        r(language.SUCCESS, {
          "{user}": `<@${warn.target}>`,
          "{id}": id,
        })
      );
      client.deleteUserWarn(message, id);
      i--;
    }
    if (warn.id != id) {
      if (i === gd.warnings.length) {
        message.channel.sendErrorMessage(
          r(language.INVWARN, {
            "{id}": args[0],
          })
        );
      }
    }
  });
};
