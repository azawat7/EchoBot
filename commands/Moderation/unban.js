const { MessageEmbed } = require('discord.js');
const { lang } = require('moment');

module.exports.help = {
	name: "unban",
	aliases: [],
	category: "moderation",
	expectedArgs: "\`<user_id>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: ['BAN_MEMBERS'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args, language) => {
  const member = args[0];
  const bannedMembers = await message.guild.fetchBans();

  const noUser = new MessageEmbed()
  .setColor("#f50041")
  .setDescription(`${client.emoji.cross} **${language.NOTBANNED}**`)

  if (!bannedMembers.find((user) => user.user.id === member)) return message.channel.send(noUser);

  message.guild.members.unban(member);

  const sucess = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.check} **${language.SUC}**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel.send(sucess)
}


  
