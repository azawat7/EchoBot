const { MessageEmbed, MessageAttachment } = require("discord.js");
const f = require("node-fetch");

module.exports.help = {
  name: "blurpify",
  aliases: [],
  category: "image",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🌌",
};

module.exports.run = async (client, message, args, language) => {
  const data = await f(
    `https://nekobot.xyz/api/imagegen?type=blurpify&image=${message.author.displayAvatarURL(
      { size: 512 }
    )}`
  ).then((res) => res.json());

  const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setImage(data.message);

  message.channel.send({ embed });
};
