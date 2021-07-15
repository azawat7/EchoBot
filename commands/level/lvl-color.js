const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const d = require("replacer-js");

module.exports.help = {
  name: "lvl-color",
  aliases: ["level-color", "lvlcolor", "levelcolor"],
  category: "level",
  expectedArgs: "`<hex_color>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🎨",
};

module.exports.run = async (
  client,
  message,
  args,
  language,
  settings,
  userInfo
) => {
  const regex = RegExp("^(([0-9a-fA-F]{6}))$");
  if (args[0].match(regex)) {
    message.channel.sendSuccessMessage(
      d(language.SUCCESS, {
        "{hex}": args[0],
      })
    );
    client.updateUserInfo(message.guild, message.author, {
      "users.$.level.color": args[0],
    });
  } else {
    message.channel.sendErrorMessage(language.ERR);
  }
};
