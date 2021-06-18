const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.help = {
  name: "color",
  aliases: ["colors"],
  category: "utility",
  expectedArgs: "`<hex>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
};

module.exports.run = async (client, message, args, language) => {
  embed = new MessageEmbed();
  let color = args[0];
  if (color.includes("#")) {
    color = args[0].split("#")[1];
  }
  const url = `https://api.alexflipnote.dev/colour/${color}`;
  let json;
  try {
    json = await fetch(url).then((res) => res.json());
  } catch (e) {
    embed.setDescription(`${client.emoji.cross} **${language.ERROR}**`);
    embed.setColor(client.colors.echo);
    return message.channel.send(embed);
  }
  if (json.description) {
    embed.setDescription(`${client.emoji.cross} **${language.INVALID}**`);
    embed.setColor(client.colors.echo);
    return message.channel.send(embed);
  }

  embed.setTitle(json.name);
  embed.addField(`${language.RGB}`, json.rgb, true);
  embed.addField(`${language.BRIGHT}`, json.brightness, true);
  embed.addField(`${language.HEX}`, json.hex, true);
  embed.setThumbnail(json.image);
  embed.setImage(json.image_gradient, true);
  embed.setColor(json.hex);
  message.channel.send(embed);
};
