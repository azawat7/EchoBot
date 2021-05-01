const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
  console.log(`✅ Logged in as ${client.user.tag}!`);

  client.user.setPresence({ activity : { name: '$help', type: 'WATCHING', status: 'dnd' }})
}