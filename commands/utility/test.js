const { MessageEmbed } = require("discord.js");
const { createAdvancedSlider } = require("discord-epagination");

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
  // const embed1 = new MessageEmbed().setDescription(1);
  // const embed2 = new MessageEmbed().setDescription(2);

  // createAdvancedSlider(
  //   message.author.id,
  //   message.channel,
  //   [embed1, embed2],
  //   true
  // );
  return;
};
