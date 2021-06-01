const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "tstart",
  aliases: [],
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

module.exports.run = async (client, message, args, language) => {
  if (message.member.voice.channel) {
    client.discordTogether
      .createTogetherCode(message.member.voice.channelID, "youtube")
      .then(async (invite) => {
        return message.channel.send(`${invite.code}`);
      });
  } else {
    const embed = new MessageEmbed()
      .setColor(client.colors.echo)
      .setDescription(`${client.emoji.cross} **${language.NOVOICE}**`);
    message.channel.send(embed);
  }
};
