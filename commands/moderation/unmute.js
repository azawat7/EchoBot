const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "unmute",
  aliases: [],
  category: "moderation",
  expectedArgs: "`<@user>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MUTE_MEMBERS"],
  clientPerms: ["MANAGE_ROLES"],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🔉",
};

module.exports.run = async (client, message, args, language) => {
  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!member) return message.channel.sendErrorMessage(language.NOMEMBER);

  if (message.guild.me.roles.highest.position <= member.roles.highest.position)
    return message.channel.sendErrorMessage(`${language.BOTINSUFICIENTROLE}`);

  // Mute the member

  const roleToRemove = message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === "muted"
  );

  if (!member.roles.cache.has(roleToRemove.id))
    return message.channel.sendErrorMessage(
      r(language.ALMUTED, {
        "{member}": member,
      })
    );

  await member.roles.remove(roleToRemove);
  return message.channel.sendSuccessMessage(
    r(language.SUCCESS, {
      "{member}": member,
    })
  );
};
