const nsfW = require("discord-nsfw");
const nsfw = new nsfW();
const {MessageEmbed} = require('discord.js')

module.exports.help = {
	name: "porngif",
	aliases: [],
	category: "nsfw",
	expectedArgs: null,
	minArgs: 0,
	maxArgs: 0,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: true,
	cooldown: 1
}

module.exports.run = async (client, message, args) => {
    const image = await nsfw.pgif();
    const embed = new MessageEmbed()
        .setTitle(`ye`)
        .setColor("RANDOM")
        .setImage(image);
    message.channel.send(embed);    
}