const { MessageEmbed } = require('discord.js')
const moment = require('moment');

module.exports.help = {
    name: "userinfo",
    aliases: ['ui'],
    category: "utility",
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
  const flags = {
    DISCORD_EMPLOYEE: language.DISCORD_EMPLOYEE,
    DISCORD_PARTNER: language.DISCORD_PARTNER,
    BUGHUNTER_LEVEL_1: language.BUGHUNTER_LEVEL_1,
    BUGHUNTER_LEVEL_2: language.BUGHUNTER_LEVEL_2,
    HYPESQUAD_EVENTS: language.HYPESQUAD_EVENTS,
    HOUSE_BRAVERY: language.HOUSE_BRAVERY,
    HOUSE_BRILLIANCE: language.HOUSE_BRILLIANCE,
    HOUSE_BALANCE: language.HOUSE_BALANCE,
    EARLY_SUPPORTER: language.EARLY_SUPPORTER,
    TEAM_USER: language.TEAM_USER,
    SYSTEM: language.SYSTEM,
    VERIFIED_BOT: language.VERIFIED_BOT,
    VERIFIED_DEVELOPER: language.VERIFIED_DEVELOPER
  };

  let user = message.mentions.users.first() || message.author;
  let member = message.guild.member(user)
  if(args[0]) member = message.guild.member(message.mentions.users.first());
  let roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);

  let userFlags = member.user.flags.toArray();

  let embed = new MessageEmbed()
    .setAuthor(`${user.tag} :`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512}))
    .setColor("#f50041")
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())
    .addField(`\`🥽\` ${language.USER} :`, [
      `**❯ \`🙎‍♂️\` ${language.USERNAME}:** ${member.user.username}`,
      `**❯ \`🧮\` ${language.TAG}:** ${member.user.discriminator}`,
      `**❯ \`🆔\` ${language.ID} :** ${member.id}`,
      `**❯ \`🤖\` ${language.BOT} :** ${member.user.bot ? `${language.BOTT}` : `${language.BOTF}`}`,
      `**❯ \`🏆\` ${language.FLAGS}:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : `${language.FLAGSN}`}`,
      `**❯ \`🧿\` ${language.AVATAR}:** [${language.AVATARLINK}](${member.user.displayAvatarURL({ dynamic: true })})`,
      `**❯ \`📅\` ${language.TIMECREATED}:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
      `**❯ \`📄\` ${language.STATUS}:** ${member.user.presence.status}`,
      `**❯ \`📟\` ${language.GAME}:** ${member.user.presence.game || `${language.GAMENOT}`}`,
      `\u200b`
    ])
    .addField(`\`👓\` ${language.MEMBER} :`, [
      `**❯ \`🏆\` ${language.HIGHESTROLE}:** ${member.roles.highest.id === message.guild.id ? `${language.HIGHESTROLENONE}` : member.roles.highest.name}`,
      `**❯ \`🗓️\` ${language.SERVERJOIN}:** ${moment(member.joinedAt).format('LL LTS')}`,
      `**❯ \`🎭\` ${language.ROLES} [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : `${language.ROLENONE}`}`,
      `\u200b`
    ]);
  return message.channel.send(embed);
}
