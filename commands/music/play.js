const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "play",
  aliases: ["p"],
  category: "music",
  expectedArgs: "`<query/url>`",
  minArgs: 1,
  maxArgs: null,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  voice: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  const string = args.join(" ");
  client.distube.play(message, string);
};
