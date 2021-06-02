const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "translators",
  aliases: ["translation"],
  category: "fun",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
};

module.exports.run = async (client, message, args, language) => {
  let embed = new MessageEmbed()
    .setColor("#f50041")
    .addField(`:england: ${language.ENGLISH} :`, `\`im_a_panda_guy#5557\``)
    .addField(
      `:flag_pl: ${language.POLISH} :`,
      `\`im_a_panda_guy#5557\`, \`ProtGT#4797\`, \`_Franio#2975\``
    )
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
  message.channel.send(embed);
};
