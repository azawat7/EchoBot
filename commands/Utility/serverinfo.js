const { MessageEmbed } = require('discord.js')

module.exports.help = {
    name: "serverinfo",
    aliases: ['si'],
    category: "utility",
    description: "Displays information from the server.",
    expectedArgs: null,
    minArgs: 0,
    maxArgs: 0,
    ownerOnly: false,
    userPerms: [],
    clientPerms: [],
    nsfw: false,
    cooldown: 3
  }
  
module.exports.run = async (client, message, args) => {
    let guild = message.guild;
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    let serverembed = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setColor('#f50041')
        .addFields(
            { name: `\`🎴\` Name`, value: `${message.guild.name}`, inline: true },
            { name: `\`📅\` Creation Date`, value: `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, inline: true },
            { name: `\`💯\` Total Members`, value: `${message.guild.members.cache.filter(member => !member.user.bot).size} Users | ${message.guild.members.cache.filter(member => member.user.bot).size} Bots`, inline: true },
            { name: `\`🆔\` ID`, value: `${message.guild.id}`, inline: true },
            { name: `\`👑\` Owner`, value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, inline: true },
            { name: `\`🎃\` Verif. Level`, value: `${message.guild.verificationLevel}`, inline: true }
        )

    message.channel.send(serverembed);
}
