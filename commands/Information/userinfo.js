const { MessageEmbed } = require('discord.js')
const moment = require('moment');

module.exports.help = {
    name: "userinfo",
    aliases: ['ui'],
    category: "information",
    expectedArgs: "\`<@user>\`",
    minArgs: 0,
    maxArgs: 1,
    ownerOnly: false,
    userPerms: [],
    clientPerms: [],
    nsfw: false,
    cooldown: 3
  }
  
module.exports.run = async (client, message, args, language) => {
  const statuses = {
    online: `${client.emoji.online} \`Online\``,
    idle: `${client.emoji.idle} \`AFK\``,
    offline: `${client.emoji.offline} \`Offline\``,
    dnd: `${client.emoji.dnd} \`Do Not Disturb\``
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
    TEAM_USER: '\`Team User\`',
    SYSTEM: '\`System\`',
    VERIFIED_DEVELOPER: client.emoji.devbadge
  };

  let user = message.mentions.users.first() || message.author;
  let member = message.guild.member(user)
  if(args[0]) member = message.guild.member(message.mentions.users.first());

  let userFlags = member.user.flags.toArray();

  let rolesNoob;
  let roles = member.roles.cache
          .sort((a, b) => b.position - a.position)
          .map(role => role.toString())
          .slice(0, -1);

  rolesNoob = roles.join(" ")
  if(member.roles.cache.size < 1) rolesNoob = `${language.NONE}`
  if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = `\`${language.NONE}\``

  let embed = new MessageEmbed()
    .setAuthor(`${user.tag} :`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512}))
    .setColor("#f50041")
    .setTimestamp()
    .setFooter(member.id)
    .setDescription(`
    >>> **• ${language.USER} :** \`${member.user.username}\` | \`#${member.user.discriminator}\`
    **• ID :** \`${member.id}\`
    **• ${language.JOINEDDISCORD} :** \`${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\`
    **• ${language.JOINEDSERVER} :** \`${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\`
    **• ${language.ROLE} [${roles.length || '0'}] : ** ${rolesNoob || `\`${language.NONE}\``}
    **• ${language.BADGES} [${userFlags.length}] :** ${userFlags.map(flag => flags[flag]).join(' ') || `\`${language.NONE}\``}
    `)
  return message.channel.send(embed);
}
