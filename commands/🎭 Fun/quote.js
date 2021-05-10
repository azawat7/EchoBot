const { MessageAttachment, MessageEmbed } = require("discord.js")

module.exports.help = {
	name: "quote",
	aliases: ["cytat"],
	category: "🎭 fun",
	description: "Tell you iconic quote from Azawat and his friend",
	expectedArgs: "\`without args\`",
	minArgs: 0,
	maxArgs: 0,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed()
        .setColor("#f50041")
        .addField(`Azawat : 01/05/2021, 17:12:36`, `\`Zrobiłem wszystko co mogę, czyli nic.\``)
		.addField(`Maviczo : 09/05/2021, 18:20:36`, `\`Po co robić więcej kiedy można robić mniej.\``)
		.setTimestamp()
		.setFooter(message.author.username, message.author.avatarURL());
    message.channel.send(embed)
}