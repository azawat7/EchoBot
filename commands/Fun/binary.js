const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "binary",
  aliases: ["encode, decode"],
  category: "fun",
  expectedArgs: "`<encode/decode>` `<text_to_convert>`",
  minArgs: 1,
  maxArgs: null,
  ownerOnly: false,
  userPerms: [],
  clientPerms: ["SEND_MESSAGES"],
  nsfw: false,
  cooldown: 3,
};

module.exports.run = async (client, message, args, language) => {
  const query = args.shift().toLowerCase();
  let word = args.join(" ");
  if (query === "encode") {
    const { data } = await axios.get(
      `https://some-random-api.ml/binary?text=${encodeURIComponent(word)}`
    );
    message.channel.send(data.binary ?? `${language.ERROR}`, { code: "" });
  } else if (query === "decode") {
    const { data } = await axios.get(
      `https://some-random-api.ml/binary?decode=${encodeURIComponent(word)}`
    );
    message.channel.send(data.text ?? `${language.ERROR}`, { code: "" });
  } else {
    const embed = new MessageEmbed()
      .setColor(client.colors.echo)
      .setDescription(`${client.emoji.cross} **${language.NONVALID} !**`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
    message.channel.send(embed);
  }
};
