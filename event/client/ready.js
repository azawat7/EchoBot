const { MessageEmbed } = require('discord.js')
const path = require('path')
const fs = require('fs')


module.exports = async (client) => {
  console.log(`✅ Logged in as ${client.user.tag}!`);

  client.user.setPresence({ activity : { name: '$help', type: 'WATCHING', status: 'dnd' }})
}