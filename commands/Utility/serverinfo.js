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
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

    let serverembed = new MessageEmbed()
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
