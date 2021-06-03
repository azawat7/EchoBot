const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "disconnect",
  aliases: ["stop"],
  category: "music",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  voice: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  client.distube.stop(message);
  const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setDescription(`${client.emoji.check} **${language.SUC}**`);

  message.channel.send(embed);
};
