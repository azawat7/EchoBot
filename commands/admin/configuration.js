const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "configuration",
  aliases: ["config"],
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
};

module.exports.run = async (client, message, args, language, settings) => {
  let guild = message.guild;
  const config = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setColor("#f50041")
    .addFields(
      {
        name: `\`🥨\` **${language.CONFIG1}**`,
        value: `\`${settings.prefix}\``,
      },
      {
        name: `\`🏁\` **${language.CONFIG2}**`,
        value: `\`${settings.language}\``,
      }
    );

  message.channel.send(config);
};