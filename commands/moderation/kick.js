const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

module.exports.help = {
  name: "kick",
  aliases: [],
  category: "moderation",
  expectedArgs: "`<@user>` `[reason]`",
  minArgs: 2,
  maxArgs: null,
  ownerOnly: false,
  userPerms: ["KICK_MEMBERS"],
  clientPerms: ["KICK_MEMBERS"],
  nsfw: false,
  cooldown: 3,
  example: 2,
};

module.exports.run = async (client, message, args, language) => {
  const heheCannot = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.ROLEHIGH}**`);
  const heheCannotBot = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.BOT}**`);
  const noPerms = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.ERR}**`);

  let member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (!member) return message.channel.send(heheCannotBot);

  if (message.member.roles.highest.position <= member.roles.highest.position)
    return message.channel.send(heheCannot);

  if (message.guild.me.roles.highest.position <= member.roles.highest.position)
    return message.channel.send(noPerms);

  member.kick({ days: 7, reason: reason });

  const sucess = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.check} **${replace(language.SUC, {
        "{user}": member.user.username,
        "{moderator}": message.author.username,
        "{reason}": reason,
      })}**`
    )
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel.send(sucess);
};
