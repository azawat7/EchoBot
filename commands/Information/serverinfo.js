const { MessageEmbed } = require('discord.js')

module.exports.help = {
    name: "serverinfo",
    aliases: ['si'],
    category: "information",
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
            { name: `\`🎴\` ${language.NAME}`, value: `${message.guild.name}`, inline: true },
            { name: `\`📅\` ${language.CREATIONDATE}`, value: `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, inline: true },
            { name: `\`💯\` ${language.TOTALMEMBERS}`, value: `${message.guild.members.cache.filter(member => !member.user.bot).size} Users | ${message.guild.members.cache.filter(member => member.user.bot).size} Bots`, inline: true },
            { name: `\`🆔\` ${language.ID}`, value: `${message.guild.id}`, inline: true },
            { name: `\`👑\` ${language.OWNER}`, value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, inline: true },
            { name: `\`🎃\` ${language.VERIFLVL}`, value: `${message.guild.verificationLevel}`, inline: true }
        )

    message.channel.send(serverembed);
}
