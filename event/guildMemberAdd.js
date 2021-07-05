const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
  const settings = await client.getGuild(member.guild);
  const language = require(`../languages/${settings.language}/events`);

  if (settings.antiAlt.enabled === true) {
    const timeStamp = ms(`${settings.antiAlt.time} days`);

    const createdAt = new Date(member.user.createdAt).getTime();
    const difference = Date.now() - createdAt;

    if (difference < timeStamp) {
      const embed = new MessageEmbed()
        .setColor(client.colors.echo)
        .setDescription(
          `**${client.emoji.information} You can't join this server because this server has anti-alt activated.\nYour account must be atleast ${settings.antiAlt.time} days old to join this server**`
        );
      member.send({ embeds: [embed] }).catch(() => {});
      return member.kick(language.ANTIALTREASON);
    }
  }

  if (settings.autoRole.enabled === true) {
    member.roles.add(settings.autoRole.role);
  }
};
