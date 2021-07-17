const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "axolotl",
  aliases: [],
  category: "image",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "◾",
};

module.exports.run = async (client, message, args, language) => {
  const imgFile = require("../../assets/json/axolotl_img.json");
  const factFile = require("../../assets/json/axolotl_facts.json");

  const img = imgFile.imgs[Math.floor(Math.random() * 111 + 1)];
  const fact = factFile.facts[Math.floor(Math.random() * 26 + 1)];

  const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setImage(img)
    .setDescription(`**${fact}**`)
    .setFooter(language.FOOTER);
  message.channel.send({ embeds: [embed] });
};
