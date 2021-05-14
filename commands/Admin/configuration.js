const { MessageEmbed } = require("discord.js")

module.exports.help = {
	name: "configuration",
	aliases: ["config"],
	category: "admin",
	description: "Show's the current server config.",
	expectedArgs: null,
	minArgs: 0,
	maxArgs: 0,
	ownerOnly: false,
	userPerms: ['ADMINISTRATOR'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args, settings) => {
    let guild = message.guild;
    const config = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setColor("#f50041")
		.setDescription(`🥨 **Prefix :** \`${settings.prefix}\``)

    message.channel.send(config)
};