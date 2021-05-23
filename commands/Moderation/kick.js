const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "kick",
  aliases: [],
  category: "moderation",
  expectedArgs: "`<@user>` `<reason>`",
  minArgs: 2,
  maxArgs: null,
  ownerOnly: false,
  userPerms: ["KICK_MEMBERS"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
};

module.exports.run = async (client, message, args, language) => {
  const heheCannot = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.ROLEHIGH}**`);

  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (message.member.roles.highest.position <= member.roles.highest.position)
    return message.channel.send(heheCannot);

  member.kick({ days: 7, reason: reason });

  const sucess = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.check} **\`${member.username}\` ${language.SUC1} \`${message.author.username}\` ${language.SUC2} \`${reason}\` !**`
    )
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel.send(sucess);
};
