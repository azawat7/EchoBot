const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "mute",
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
  emoji: "🔇",
};

module.exports.run = async (client, message, args, language) => {
  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!member) return message.channel.sendErrorMessage(language.NOMEMBER);

  const role = message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === "muted"
  );

  if (!role) {
    let muteRole = await message.guild.roles.create({
      data: {
        name: "Muted",
        permissions: [],
      },
    });
  }

  const roleToAdd = message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === "muted"
  );

  for (const channel of message.guild.channels.cache) {
    channel[1]
      .updateOverwrite(roleToAdd, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false,
      })
      .catch(() => {});
  }

  if (message.member.roles.highest.position <= member.roles.highest.position)
    return message.channel.sendErrorMessage(`${language.INSUFICIENTROLE}`);

  if (message.guild.me.roles.highest.position <= member.roles.highest.position)
    return message.channel.sendErrorMessage(`${language.BOTINSUFICIENTROLE}`);

  // Mute the member

  if (member.roles.cache.has(roleToAdd.id))
    return message.channel.sendErrorMessage(
      r(language.ALMUTED, {
        "{member}": member,
      })
    );

  await member.roles.add(roleToAdd);
  return message.channel.sendSuccessMessage(
    r(language.SUCCESS, {
      "{member}": member,
    })
  );
};
