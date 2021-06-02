const nsfW = require("discord-nsfw");
const nsfw = new nsfW();
const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "neko",
  aliases: [],
  category: "nsfw",
  expectedArgs: "`<feet/pussy/tits>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: true,
  cooldown: 1,
};

module.exports.run = async (client, message, args) => {
  const status = args[0];

  const sembed = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `**${client.emoji.cross} Valid args are \`feet\`, \`pussy\`, \`tits\` !**`
    );

  if (!["feet", "pussy", "tits"].includes(status))
    return message.channel.send(sembed);

  if (status === "feet") {
    const image = await nsfw.nekofeet();
    const embed = new MessageEmbed()
      .setTitle(`Neko feet`)
      .setColor("RANDOM")
      .setImage(image);
    message.channel.send(embed);
  } else if (status === "pussy") {
    const image = await nsfw.nekopussy();
    const embed = new MessageEmbed()
      .setTitle(`Neko pussy`)
      .setColor("RANDOM")
      .setImage(image);
    message.channel.send(embed);
  } else if (status === "tits") {
    const image = await nsfw.nekotits();
    const embed = new MessageEmbed()
      .setTitle(`Neko tits`)
      .setColor("RANDOM")
      .setImage(image);
    message.channel.send(embed);
  }
};
