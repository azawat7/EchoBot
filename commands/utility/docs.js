const axios = require("axios");

module.exports.help = {
  name: "docs",
  aliases: ["discordjs", "djs"],
  category: "utility",
  expectedArgs: "`<query>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: ["EMBED_LINKS"],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🧾",
};

module.exports.run = async (client, message, args, language) => {
  const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
    args
  )}`;

  axios
    .get(uri)
    .then((embed) => {
      const { data } = embed;

      if (data && !data.error) {
        message.channel.send({ embeds: [data] });
      } else {
        message.reply(`${client.emoji.cross} ${language.ERROR}`);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
