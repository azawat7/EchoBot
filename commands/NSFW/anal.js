const nsfE = require("discord-nsfw");
const nsfw = new nsfE();
const {MessageEmbed} = require('discord.js')

module.exports.help = {
	name: "anal",
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
    const image = await nsfw.anal();
    const embed = new MessageEmbed()
        .setTitle(`Anal...`)
        .setColor("RANDOM")
        .setImage(image);
    message.channel.send(embed);    
}