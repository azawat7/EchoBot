const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const d = require("replacer-js");

module.exports.help = {
  name: "userinfo",
  aliases: ["ui"],
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
  emoji: "🧑",
};

module.exports.run = async (client, message, args, language) => {
  const statuses = {
    dnd: `${client.emoji.dnd} \`${language.DND}\``,
    online: `${client.emoji.online} \`${language.ONLINE}\``,
    idle: `${client.emoji.idle} \`${language.IDLE}\``,
    offline: `${client.emoji.offline} \`${language.OFFLINE}\``,
  };
  const flags = {
    DISCORD_EMPLOYEE: client.emoji.employee,
    DISCORD_PARTNER: client.emoji.partner,
    BUGHUNTER_LEVEL_1: client.emoji.bughunterlv1,
    BUGHUNTER_LEVEL_2: client.emoji.bughunterlv2,
    HYPESQUAD_EVENTS: client.emoji.hypesquad,
    HOUSE_BRAVERY: client.emoji.bravery,
    HOUSE_BRILLIANCE: client.emoji.brilliance,
    HOUSE_BALANCE: client.emoji.balance,
    EARLY_SUPPORTER: client.emoji.earlysupporter,
    TEAM_USER: "`Team User`",
    SYSTEM: "`System`",
    VERIFIED_DEVELOPER: client.emoji.devbadge,
  };

  let user = message.mentions.users.first() || message.author;
  let member = message.guild.member(user);
  if (args[0]) member = message.guild.member(message.mentions.users.first());
  const devices = member.presence?.clientStatus || {};
  let userFlags = member.user.flags.toArray();

  let rolesNoob;
  let roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);

  rolesNoob = roles.join(" ");
  if (member.roles.cache.size < 1) rolesNoob = `${language.NONE}`;
  if (!member.roles.cache.size || member.roles.cache.size - 1 < 1)
    roles = `\`${language.NONE}\``;

  let embed = new MessageEmbed()
    .setAuthor(
      `${d(language.TITLE, {
        "{user}": member.user.username,
      })}`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor("#f50041")
    .setTimestamp()
    .setFooter(member.id).setDescription(`
    >>> __**${language.USERID}**__
    **• ${language.USER} :** \`${member.user.username}\` | \`#${
    member.user.discriminator
  }\`
    **• ID :** \`${member.id}\`
    **• ${language.JOINEDDISCORD} :** \`${moment(member.user.createdAt).format(
    "MMMM Do YYYY, h:mm:ss a"
  )}\`
    **• ${language.BADGES} [${userFlags.length}] :** ${
    userFlags.map((flag) => flags[flag]).join(" ") || `\`${language.NONE}\``
  }

  __**${language.MEMBERID}**__
    **• ${language.JOINEDSERVER} :** \`${moment(member.joinedAt).format(
    "MMMM Do YYYY, h:mm:ss a"
  )}\`
    **• ${language.ROLE} [${roles.length || "0"}] : ** ${
    rolesNoob || `\`${language.NONE}\``
  }`);
  return message.channel.send({ embed });
};
