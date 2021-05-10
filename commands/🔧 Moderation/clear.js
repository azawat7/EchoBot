const { MessageEmbed } = require('discord.js')

module.exports.help = {
	name: "clear",
	aliases: ['purge'],
	category: "🔧 moderation",
	description: "Clear a desired amount of msg.",
	expectedArgs: "\`<number_of_msg>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: ['MANAGE_MESSAGES'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args) => {
  
const amount = args.join(' ');

const invAmount = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **You did not provided a number !**`)

const thAmount = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **You can only delete a maximum of 100 msg !**`)

const tlAmount = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **You need to delete at least 1 msg !**`)

// Condition

  if (isNaN(amount)) return message.channel.send(invAmount);

  if (amount > 100) return message.channel.send(thAmount)

  if (amount < 1) return message.channel.send(tlAmount);

// Execute le clear
  await message.channel.messages.fetch({ limit: amount }).then(messages => { message.channel.bulkDelete(messages)})

const clearSuc = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.check} **${amount} msg has been deleted from this channel !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

message.channel.send(clearSuc)
}


  
