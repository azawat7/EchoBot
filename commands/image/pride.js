const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports.help = {
  name: "pride",
  aliases: ["lgbtq+"],
  category: "image",
  expectedArgs: "",
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
};

module.exports.run = async (client, message, args, language) => {
  let api = `https://some-random-api.ml/canvas/gay/?avatar=${message.author.avatarURL(
    { format: "png" }
  )}`;

  let attachment = new MessageAttachment(api, "avatar.png");

  const embed = new MessageEmbed()
    .attachFiles(attachment)
    .setImage("attachment://avatar.png")
    .setFooter(
      message.member.displayName,
      message.author.displayAvatarURL({ dynamic: true })
    )
    .setTimestamp()
    .setColor(client.colors.echo);
  return message.channel.send(embed);
};
