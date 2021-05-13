const { MessageEmbed } = require('discord.js')
const ms = require("ms");

module.exports.help = {
	name: "giveawaydelete",
	aliases: ["gdelete"],
	category: "moderation",
	description: "Delete a giveaway.",
	expectedArgs: "\`<giveaway_id>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: ['MANAGE_MESSAGES'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args) => {
    let giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);
    if (!giveaway) return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
    const messageID = args[0];

    const ERROR = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **No giveaway found for ${messageID} !**`)

    const YES = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.check} **Giveaway deleted !**`)

    client.giveawaysManager.delete(messageID).then(() => {
        message.channel.send('Success! Giveaway deleted!');
    }).catch((err) => {
        message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
    })
}


  