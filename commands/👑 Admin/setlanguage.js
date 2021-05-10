const { MessageEmbed } = require("discord.js")
const db = require('../../echoDB')

module.exports.help = {
	name: "setlanguage",
	aliases: ["language", "setlang", "lang"],
	category: "👑 admin",
	description: "Change the current language.",
	expectedArgs: "\`<new_language>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: ['ADMINISTRATOR'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args, settings) => {
    const lang = args[0];

    const sembed = new MessageEmbed()
        .setColor(client.colors.echo)
        .setDescription(`${client.cross} **Those are the supported language : \`en\`(english) \`fr\`(french) \`pl\`(polish) !**`)

    //if(lang !== 'pl' || 'fr' || 'en') return message.channel.send(sembed)

    const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setDescription(`${client.check} **The new language is \`${lang}\` !**`)

    await db.set(`lang-${message.guild.id}`, lang);
    message.channel.send(embed)
};