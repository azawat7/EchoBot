const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createAdvancedSlider } = require("discord-epagination");
const { Guild } = require("../../models/index");
const Captcha = require("@haileybot/captcha-generator");

module.exports.help = {
  name: "test",
  aliases: [],
  category: "utility",
  expectedArgs: "`<id>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: true,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 3,
  // hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  const id = args[0];

  const gd = await Guild.findOne({ guildID: message.guild.id });

  if (!gd.warnings.includes(id)) {
    return message.channel.send("test");
  }

  client.deleteUserWarn(message, id);
};
