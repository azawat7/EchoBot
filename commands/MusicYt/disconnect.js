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
};

module.exports.run = async (client, message, args, language, settings) => {
  let embed = new MessageEmbed().setColor(client.colors.echo);

  const { channel } = message.member.voice;

  if (!channel) {
    embed.setDescription(`**${client.emoji.cross} ${language.NOCHANNEL}**`);
    return message.channel.send(embed);
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    embed.setDescription(`**${client.emoji.cross} ${language.NOSONGS}**`);
    return message.channel.send(embed);
  }

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
};
