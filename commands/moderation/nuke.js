const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

module.exports.help = {
  name: "nuke",
  aliases: [],
  category: "moderation",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
  clientPerms: ["MANAGE_CHANNELS"],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🤯",
  moderator: true,
};

module.exports.run = async (client, message, args, language) => {
  const position = message.channel.position;
  message.channel.clone().then(async (c) => {
    message.channel.delete();
    c.setPosition(position);
    await c.send({
      embeds: [
        new MessageEmbed()
          .setColor(client.colors.echo)
          .setDescription(`**${language.NUKED}**`),
      ],
    });
    c.send({
      content:
        "https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831",
    });
  });
};
