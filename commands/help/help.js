let { MessageEmbed } = require("discord.js");
const { prefix } = require('../../config')
const { readdirSync } = require("fs")

module.exports = {
  commands:['help'],
  expectedArgs: '<command_name>',
  permissionError: 'You need admin permissions to run this command',
  minArgs: 0,
  maxArgs: 1,
	callback: async (client, message, arguments, text) => {
      let ahEmbed = new MessageEmbed()
      .setTitle("📜 Lol Troll Build - Help")
      .setColor("#ffffff")
      .setTimestamp()
      .addFields(
        { name: "A list of all command.", value: `**For more information on a command, write \`${prefix}help <command_name>\`\n**`}
      )
      .addFields(
        { name: "**🔗 Core :**", value: "`generate`"},
      )
    if (!arguments.length) {
      message.channel.send(ahEmbed)
    }
  },
  requiredRoles: [],
}