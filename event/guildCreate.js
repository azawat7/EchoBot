const { MessageEmbed, WebhookClient } = require("discord.js");
const webhookClient = new WebhookClient({
  id: process.env.WEBHOOKID,
  token: process.env.WEBHOOKURL,
  url: `https://discord.com/api/webhooks/${process.env.WEBHOOKID}/${process.env.WEBHOOKURL}`,
});

module.exports = async (client, guild) => {
  // Create the guild in the DB
  const newGuild = {
    guildID: guild.id,
  };
  await client.createGuild(newGuild);

  // Send a message to {echo} support
  const botJoinEmbed = new MessageEmbed()
    .setTitle(`${client.emoji.check} {echo} joined server !`)
    .setColor(client.colors.green)
    .setTimestamp()
    .addField(`📟 Server`, `\`${guild.name}\` *(${guild.id})*`)
    // .addField(
    //   `🆔 Owner`,
    //   `\`${guild.owner.user.username}\` *(${guild.owner.id})*`
    // )
    .setFooter(`{echo} is now in ${client.guilds.cache.size} guilds`);

  webhookClient.send({
    embeds: [botJoinEmbed],
  });

  // Send a message to the guild owner
  const guildOwnerEmbed = new MessageEmbed()
    .setTitle(`${client.emoji.fun} Thank you for adding me to ${guild.name} !`)
    .setColor(client.colors.echo)
    .setTimestamp()
    .setDescription(
      `My default prefix is \`$\` and you can get help by typing \`$help\`.`
    )
    .setFooter(`{echo} - Open Source`);

  // owner.send({ embed: guildOwnerEmbed }).catch(() => {});
};
