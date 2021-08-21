const { MessageEmbed } = require("discord.js");
const { Guild } = require("../../models/index");
const r = require("replacer-js");

module.exports.help = {
  name: "warns",
  aliases: ["list-warn", "list-warns", "listwarn", "listwarns", "warnings"],
  category: "moderation",
  expectedArgs: "`[user_id]`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: true,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "❗📃",
  moderator: true,
  // hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  const embed = new MessageEmbed().setColor(client.colors.echo);
  const member = message.mentions.members.first();
  i = 0;

  if (member) {
    const warns = settings.warnings.filter((warn) => warn.target === member.id);

    if (!warns.length) {
      return message.channel.sendErrorMessage(
        r(language.NOWARNS, {
          "{user}": member.user.tag,
        })
      );
    }

    warns.forEach((warn) => {
      i++;
      embed.addField(
        `${i}) \`${warn.id}\``,
        `
          > **${language.REASON}** : ${warn.reason},
          > **${language.MODERATOR}** : <@${warn.moderator}>,
          > **${language.DATE}** : <t:${Math.floor(warn.date / 1000)}:F>,
        `,
        true
      );
    });
    embed.setTitle(
      r(language.WARNS, {
        "{user}": member.user.tag,
      })
    );
    message.channel.send({ embeds: [embed] });
  }

  if (!member) {
    const warns = settings.warnings;

    if (!warns.length) {
      return message.channel.sendErrorMessage(language.NOSERVERW);
    }

    warns.forEach((warn) => {
      i++;
      embed.addField(
        `${i}) \`${warn.id}\``,
        `
          > **${language.MEMBER}** : <@${warn.target}>,
          > **${language.REASON}** : ${warn.reason},
          > **${language.MODERATOR}** : <@${warn.moderator}>,
          > **${language.DATE}** : <t:${Math.floor(warn.date / 1000)}:F>,
        `,
        true
      );
    });
    embed.setTitle(language.SERVERW);
    message.channel.send({ embeds: [embed] });
  }
};
