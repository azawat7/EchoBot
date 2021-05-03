const { MESSAGES } = require("../../util/constants")
let { MessageEmbed } = require("discord.js");
const { prefix } = require('../../config')
const { readdirSync } = require("fs")

module.exports.run = async (client, message, args) => {
    let ahEmbed = new MessageEmbed()
    .setTitle("📜 Lol Troll Build - Help")
    .setColor("#ffffff")
    .setTimestamp()
    .addFields(
      { name: "A list of all command.", value: `**For more information on a command, write \`${config.prefix}help <command_name>\`\n**`}
    )
    .addFields(
      { name: "**🔗 Core :**", value: "`generate`"},
    )
  if (!args.length) {
    message.channel.send(ahEmbed)
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(command => command.help.aliases && command.help.aliases.includes(args[0]))

    const csEmbed = new MessageEmbed()
      .setColor("#2c3434")
      .setAuthor(`Here's are all command information of ${command.help.name} :`)
      .addField(`📃 Description :`, `${command.help.description}`)
      .addField("⏱ Cooldown :", `${command.help.cooldown} second(s)`)
      .addField("🧿 Usage :", command.help.usage ? `${config.prefix}${command.help.name} ${command.help.usage}` : `${config.prefix}${command.help.name}`)

    if (command.help.aliases.length > 1) csEmbed.addField("🔖 Alias", `${command.help.aliases.join(', ')}`, true)
    return message.channel.send(csEmbed)
  }
}

module.exports.help = MESSAGES.COMMANDS.HELP.HELP;