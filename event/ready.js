const { MessageEmbed } = require('discord.js')

module.exports = async (client) => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity : { name: `$help on ${client.guilds.cache.size} guilds`, type: 'WATCHING', status: 'dnd' }})
}