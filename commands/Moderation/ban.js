const { MessageEmbed } = require('discord.js')

module.exports.help = {
	name: "ban",
	aliases: [],
	category: "moderation",
	description: "Ban a desired user from the server.",
	expectedArgs: "\`<@user>\` \`<reason>\`",
	minArgs: 2,
	maxArgs: null,
	ownerOnly: false,
	userPerms: ['BAN_MEMBERS'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args) => {
  const heheCannot = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **You can't ban this person because you either have the same role or your role is lower !**`)

  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(heheCannot);

  member.ban({ days: 7, reason: reason })

  const sucess = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.check} **\`${member.username}\` has been banned from the server by \`${message.author.username}\` for \`${reason}\` !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel.send(sucess)
}


  
