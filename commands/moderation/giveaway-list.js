const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.help = {
  name: "giveaway-list",
  aliases: ["glist"],
  category: "moderation",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "📔",
};

module.exports.run = async (client, message, args, language, settings) => {
  const giveaways = settings.giveaways
    .filter((g) => g.guildID === message.guild.id && !g.ended)
    .map(
      (g) =>
        `[${g.messageID}](https://discord.com/channels/${g.guildID}/${g.channelID}/${g.messageID})\n> 🎊 **${language.host}** <@${g.host}>\n> ${client.emoji.gift} **${language.prize}** \`${g.prize}\`\n> ⏱ **${language.endat}** <t:${g.endAt}:F>`
    );
  if (giveaways.length < 1) {
    const embed = new MessageEmbed()
      .setColor(client.colors.echo)
      .setDescription(`**${language.noGiveaway}**`);

    message.channel.send({ embeds: [embed] });
  } else {
    const embed = new MessageEmbed()
      .setColor(client.colors.echo)
      .setDescription(`${giveaways.join("\n\n")}`);

    message.channel.send({ embeds: [embed] });
  }
};
