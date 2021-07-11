const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

module.exports.help = {
  name: "kick",
  aliases: [],
  category: "moderation",
  expectedArgs: "`<@user>` `[reason]`",
  minArgs: 1,
  maxArgs: null,
  ownerOnly: false,
  userPerms: ["KICK_MEMBERS"],
  clientPerms: ["KICK_MEMBERS"],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "🥾",
  moderator: true,
};

module.exports.run = async (client, message, args, language) => {
  let member =
    message.mentions.members.first() || client.users.cache.get(args[0]);
  const reason = args.slice(1).join(" ") || `${language.NOREASON}`;

  if (!member) {
    return message.channel.sendErrorMessage(`${language.INVALIDMEMBER}`);
  }
  if (message.member.roles.highest.position <= member.roles.highest.position) {
    return message.channel.sendErrorMessage(`${language.INSUFICIENTROLE}`);
  }

  if (
    message.guild.me.roles.highest.position <= member.roles.highest.position
  ) {
    return message.channel.sendErrorMessage(`${language.BOTINSUFICIENTROLE}`);
  }

  member.kick(reason);

  const embed = new MessageEmbed()
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

  message.channel.send({ embeds: [embed] });
};
