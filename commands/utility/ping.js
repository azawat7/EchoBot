const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "ping",
  aliases: [],
  category: "utility",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
};

module.exports.run = async (client, message, args, language) => {
  const msg = await message.channel.send(`**${language.PINGING}**`);
  const embed = new MessageEmbed()
    .setColor("#f50041")
    .addField(
      "**🔴 {echo} :**",
      `>>> \`${msg.createdTimestamp - message.createdTimestamp}ms\``
    )
    .addField("**🔵 WS :**", `>>> \`${language.WS}\``);
  msg.edit({ embed: embed });
};
