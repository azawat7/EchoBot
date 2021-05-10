const { MessageEmbed } = require('discord.js')

module.exports.help = {
	name: "unban",
	aliases: [],
	category: "🔧 moderation",
	description: "Unban a desired user.",
	expectedArgs: "\`<user_id>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: ['BAN_MEMBERS'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args) => {
  const member = args[0];
  const bannedMembers = await message.guild.fetchBans();

  const noUser = new MessageEmbed()
  .setColor("#f50041")
  .setDescription(`${client.cross} **User is not banned !**`)

  if (!bannedMembers.find((user) => user.user.id === member)) return message.channel.send(noUser);

  message.guild.members.unban(member);

  const sucess = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.check} **Unbanned user !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel.send(sucess)
}


  
