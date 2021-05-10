const { MessageEmbed } = require("discord.js");
const { readdirSync } = require('fs')
const categoryList = readdirSync('./commands')

module.exports.help = {
  name: "help",
  aliases: [],
  category: "🧬 general",
  description: "List of all commands",
  expectedArgs: "\`<command_name>\`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
	userPerms: [],
	clientPerms: [],
  nsfw: false,
  cooldown: 3
}

module.exports.run = async (client, message, args, settings) => {
    if (!args.length) {
      let embed = new MessageEmbed()
      .setTitle(`📜 Echo - Support`)
      .setColor(`#f50041`)
      .addField(`This is the list of all the commands.`, `**For more information on a command, write \`${settings.prefix}help\` \`<command_name>\`\n**`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
  
      for (const category of categoryList) {
        embed.addField(`${category}`, `\`${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join('\`, \`')}\``)
      };
      return message.channel.send(embed)
    } else {
      const command = client.commands.get(args[0]) || client.commands.find(command => command.help.aliases && command.help.aliases.includes(args[0]))
      const embed = new MessageEmbed()
        .setColor(`#f50041`)
        .setAuthor(`Here are the ${command.help.name} information :`)
        .addField(`📃 Description`, `\`${command.help.description}\``)
        .addField(`⏱ Cooldown`, `\`${command.help.cooldown} second(s)\``)
        .addField(`🧿 Usage`, command.help.expectedArgs ? `\`${settings.prefix}${command.help.name}\` ${command.help.expectedArgs}` : `${settings.prefix}${command.help.name}`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
        if (command.help.aliases.length > 0) embed.addField(`🔖 Alias`, `\`${command.help.aliases.join('\`, \`')}\``)
        if (command.help.nsfw) embed.addField(`🔞 NSFW`, `\`You can only use this command in NSFW channel !\``)
        if (command.help.ownerOnly) embed.addField(`❌ Owner Only`, `\`This command is only available for the owner of this bot !\``)
      return message.channel.send(embed)
    }
  };
    