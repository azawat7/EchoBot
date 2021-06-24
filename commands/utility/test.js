const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "test",
  aliases: [],
  category: "utility",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: true,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 3,
  hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  return;
};
