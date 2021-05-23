const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild) => {
  await client.deleteLogs(guild);
  await client.deleteGuild(guild);

  const botJoinEmbed = new MessageEmbed()
    .setTitle(`${client.emoji.check} New Server`)
    .setColor(client.colors.echo)
    .setTimestamp()
    .addField(`Server Name`, `\`${guild.name}\``, true)
    .addField(`Server ID`, `\`${guild.id}\``, true)
    .setFooter(`${client.guilds.cache.size} guilds`);

  client.channels.cache.get("844457082065649676").send(botJoinEmbed);
};
