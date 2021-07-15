const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const d = require("replacer-js");

module.exports.help = {
  name: "leaderboard",
  aliases: ["ranks", "levels", "lvls"],
  category: "level",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "📊",
};

module.exports.run = async (
  client,
  message,
  args,
  language,
  settings,
  userInfo
) => {
  const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setTitle(`⚠ W.I.P`)
    .setDescription(
      `${language.TITLE} [here](http://45.77.63.91:3000/leaderboard?guild=${message.guild.id})`
    );
  message.channel.send({ embeds: [embed] });
};
