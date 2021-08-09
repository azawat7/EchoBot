const { MessageEmbed, WebhookClient } = require("discord.js");
const webhookClient = new WebhookClient({
  id: process.env.WEBHOOKID,
  token: process.env.WEBHOOKURL,
  url: `https://discord.com/api/webhooks/${process.env.WEBHOOKID}/${process.env.WEBHOOKURL}`,
});

module.exports = async (client, guild) => {
  await client.deleteGuild(guild);

  const botLeaveEmbed = new MessageEmbed()
    .setTitle(`${client.emoji.cross} {echo} left a server !`)
    .setColor(client.colors.red)
    .setTimestamp()
    .addField(`\📟 Server :`, `\`${guild.name}\` *(${guild.id})*`)
    // .addField(
    //   `\🆔 Owner :`,
    //   `\`${guild.owner.username}\` *(${guild.owner.id})*`
    // )
    .setFooter(`{echo} is now in ${client.guilds.cache.size} guilds`);

  webhookClient.send({
    embeds: [botLeaveEmbed],
  });
};
