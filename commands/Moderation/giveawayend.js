const { MessageEmbed } = require('discord.js')
const ms = require("ms");

module.exports.help = {
	name: "giveawayend",
	aliases: ["gend"],
	category: "moderation",
	expectedArgs: "\`<giveaway_id>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args, language) => {
    let giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);
    if (!giveaway) return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
    const messageID = args[0];

    const ERROR = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.cross} **${language.ERRORS} ${messageID} !**`)

    const YES = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.check} **${language.SUCS}**`)

    client.giveawaysManager.end(messageID).then(() => {
        message.channel.send(YES);
    }).catch((err) => {
        message.channel.send(ERROR);
    })
}


  
