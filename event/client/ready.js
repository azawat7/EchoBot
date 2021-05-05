const { MessageEmbed } = require('discord.js')
const loadCommands = require('../../commands/command-loader')

module.exports = async (client) => {
  console.log(`✅ Logged in as ${client.user.tag}!`);

  client.user.setPresence({ activity : { name: '$help', type: 'WATCHING', status: 'dnd' }})
}