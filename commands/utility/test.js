const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createAdvancedSlider } = require("discord-epagination");
const { Guild } = require("../../models/index");
const Captcha = require("@haileybot/captcha-generator");

module.exports.help = {
  name: "test",
  aliases: [],
  category: "utility",
  expectedArgs: "`<id>`",
  minArgs: 0,
  maxArgs: null,
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
  let member = client.users.cache.get(id);
  return message.channel.send(`**Tag :** \`${member.tag}\``);
};
