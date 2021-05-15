const { MessageEmbed } = require("discord.js")

module.exports.help = {
	name: "setlanguage",
	aliases: ["setlang", "language", "lang"],
	category: "admin",
	expectedArgs: "\`<new_language>\`",
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: false,
	userPerms: ['ADMINISTRATOR'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args, language, settings) => {

  let languages = ["english"]

  const sembed = new MessageEmbed()
  .setColor("#f50041")
  .setDescription(`**${client.cross} ${language.SETLANGUAGE1} \`english\`!**`)

  const aembed = new MessageEmbed()
  .setColor("#f50041")
  .setDescription(`**${client.cross} ${language.SETLANGUAGE2} !**`)

  const newSetting = args.slice(0).join(" ");

  if(!languages.includes(args[0].toLowerCase())) return message.channel.send(sembed)

  if(args[0] === settings.language) return message.channel.send(aembed)

  const actLang = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`**${language.SETLANGUAGE3} !** \`${settings.language}\` -> \`${newSetting.toLowerCase()}\``)

	if (args.length) {
		await client.updateGuild(message.guild, { language: args[0] });
		return message.channel.send(actLang);
	}
};