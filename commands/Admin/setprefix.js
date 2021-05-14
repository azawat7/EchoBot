const { MessageEmbed } = require("discord.js")

module.exports.help = {
	name: "setprefix",
	aliases: ["prefix"],
	category: "admin",
	description: "Change the current prefix.",
	expectedArgs: "\`<new_prefix>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: ['ADMINISTRATOR'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args, settings) => {
  const newSetting = args.slice(0).join(" ");

  const actPrefix = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`**Prefix updated !** \`${settings.prefix}\` -> \`${newSetting}\``)

	if (newSetting) {
		await client.updateGuild(message.guild, { prefix: newSetting });
		return message.channel.send(actPrefix);
	}
};