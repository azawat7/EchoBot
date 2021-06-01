const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

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
  const heheCannotBot = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.BOT}**`);

  let member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (!member) return message.channel.send(heheCannotBot);

  // if (member.roles.highest.position <= member.member.roles.highest.position)
  //   return message.channel.send(heheCannot);

  if (!member.kickable) return message.channel.send(heheCannot);

  member.kick({ days: 7, reason: reason });
  const data = `${language.SUC}`;

  const replaced = {
    "{user}": member.user.username,
    "{moderator}": message.author.username,
    "{reason}": reason,
  };

  const sucess = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.check} **${replace(data, replaced)}**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel.send(sucess);
};
