const { MessageEmbed } = require('discord.js')

module.exports.help = {
    name: "ping",
    aliases: [],
    category: "utility",
    expectedArgs: null,
    minArgs: 0,
    maxArgs: 0,
    ownerOnly: false,
    userPerms: [],
    clientPerms: [],
    nsfw: false,
    cooldown: 3
}

module.exports.run = async (client, message, args, language) => {
    const msg = await message.channel.send(`**${language.PINGING}**`);
    msg.edit(
    new MessageEmbed()
      .setColor("#f50041")
      .addField("**🔴 Echo :**", `>>> \`${msg.createdTimestamp - message.createdTimestamp}ms\``)
      .addField("📟 **API Discord.js :**", `>>> \`${Math.round(client.ws.ping)}ms\``)
    )
}