const { MessageEmbed } = require('discord.js')
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports.help = {
    name: "userinfo",
    aliases: ['ui'],
    category: "utility",
    description: "Displays information from a user.",
    expectedArgs: "\`<@user>\`",
    minArgs: 0,
    maxArgs: 1,
    ownerOnly: false,
    userPerms: [],
    clientPerms: [],
    nsfw: false,
    cooldown: 3
  }
  
module.exports.run = async (client, message, args) => {
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
    .addField('\`🥽\` User :', [
      `**❯ \`🙎‍♂️\` Username:** ${member.user.username}`,
      `**❯ \`🧮\` Discriminator:** ${member.user.discriminator}`,
      `**❯ \`🆔\` ID :** ${member.id}`,
      `**❯ \`🤖\` Bot :** ${member.user.bot ? 'True' : 'False'}`,
      `**❯ \`🏆\` Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
      `**❯ \`🧿\` Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
      `**❯ \`📅\` Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
      `**❯ \`📄\` Status:** ${member.user.presence.status}`,
      `**❯ \`📟\` Game:** ${member.user.presence.game || 'Not playing a game.'}`,
      `\u200b`
    ])
    .addField('\`👓\` Member :', [
      `**❯ \`🏆\` Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
      `**❯ \`🗓️\` Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
      `**❯ \`🎭\` Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
      `\u200b`
    ]);
  return message.channel.send(embed);
}
