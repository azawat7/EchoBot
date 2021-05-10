const axios = require('axios')

module.exports.help = {
    name: "docs",
    aliases: ["discordjs", "djs"],
    category: "utility",
    description: "Displays information from the discord.js docs.",
    expectedArgs: "\`<query>\`",
    minArgs: 1,
    maxArgs: 1,
    ownerOnly: false,
    userPerms: [],
    clientPerms: [],
    nsfw: false,
    cooldown: 3
  }
  
module.exports.run = async (client, message, args) => {
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
        args
      )}`
  
      axios
        .get(uri)
        .then((embed) => {
          const { data } = embed
  
          if (data && !data.error) {
            message.channel.send({ embed: data })
          } else {
            message.reply('Could not find that documentation')
          }
        })
        .catch((err) => {
          console.error(err)
    })
}
