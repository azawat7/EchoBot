const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "configuration",
  aliases: ["config", "modules", "module"],
  category: "admin",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🛂",
};

module.exports.run = async (client, message, args, language, settings) => {
  const config = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setColor(client.colors.echo)
    .addFields(
      {
        name: `**${language.CONFIG1}**`,
        value: `${client.emoji.echo} \`${
          settings.prefix == "$"
            ? `${settings.prefix} (${language.DEFAULT})`
            : `${settings.prefix}`
        }\``,
        inline: true,
      },
      // {
      //   name: `**${language.CONFIG2}**`,
      //   value: `${client.emoji.echo} \`${
      //     settings.language == "english"
      //       ? client.capitalize(`${settings.language} (${language.DEFAULT})`)
      //       : `${settings.language}`
      //   }\``,
      //   inline: true,
      // },
      {
        name: `${language.ANTIALT}`,
        value: `${
          settings.antiAlt.enabled
            ? `${client.emoji.on} \`${settings.antiAlt.time} ${language.DAYS}\``
            : `${client.emoji.off} \`${language.DISABLED}\``
        }`,
        inline: true,
      },
      {
        name: `${language.AUTOROLE}`,
        value: `${
          settings.autoRole.enabled
            ? `${client.emoji.on} <@&${settings.autoRole.role}>`
            : `${client.emoji.off} \`${language.DISABLED}\``
        }`,
        inline: true,
      }
    );

  message.channel.send({ embed: config });
};
