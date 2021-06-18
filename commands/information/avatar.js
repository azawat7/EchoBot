const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "avatar",
  aliases: ["profilepic", "pic", "ava", "av"],
  category: "information",
  expectedArgs: "`[@user]`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
};

module.exports.run = async (client, message, args, language) => {
  const match = message.content.match(/\d{18}/);
  let member = match
    ? message.guild.members.cache.get(match[0])
    : message.member;

  if (!member) member = message.member;

  const embed = new MessageEmbed()
    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setFooter(
      message.member.displayName,
      message.author.displayAvatarURL({ dynamic: true })
    )
    .setTimestamp()
    .setColor(client.colors.echo);
  return message.channel.send(embed);
};
