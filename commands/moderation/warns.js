const { MessageEmbed } = require("discord.js");
const { Guild } = require("../../models/index");
const r = require("replacer-js");

module.exports.help = {
  name: "warns",
  aliases: ["list-warn", "list-warns", "listwarn", "listwarns"],
  category: "moderation",
  expectedArgs: "`<id>`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: true,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  // hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  const embed = new MessageEmbed().setColor(client.colors.echo);
  const member = message.mentions.members.first();

  if (member) {
    i = 0;
    const warns = settings.warnings.filter((warn) => (warn.target = member.id));

    if (!warns.length) {
      embed.setTitle(
        `${client.emoji.cross} ${r(language.NOWARNS, {
          "{user}": member.user.tag,
        })}`
      );
      return message.channel.send(embed);
    }

    warns.forEach((warn) => {
      i++;
      embed.addField(`${i}) \`${warn.id}\``, [
        `>>> **${language.REASON}** : ${warn.reason}`,
        `**${language.MODERATOR}** : <@${warn.moderator}>`,
        `**${language.DATE}** : ${warn.date}`,
      ]);
    });
    embed.setTitle(
      r(language.WARNS, {
        "{user}": member.user.tag,
      })
    );
    message.channel.send(embed);
  }
};
