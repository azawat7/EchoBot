const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

module.exports.help = {
  name: "lock",
  aliases: [],
  category: "moderation",
  expectedArgs: "`[channel]`",
  minArgs: 0,
  maxArgs: null,
  ownerOnly: false,
  userPerms: ["MANAGE_CHANNELS"],
  clientPerms: ["MANAGE_CHANNELS"],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "🔐",
  moderator: true,
};

module.exports.run = async (client, message, args, language) => {
  let channel = message.mentions.channels.first() || message.channel;

  if (channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false) {
    return message.channel.sendErrorMessage(
      `${replace(language.ALLOCKED, {
        "{channel}": channel,
      })}`
    );
  }

  // Locks the channel

  channel
    .updateOverwrite(
      message.guild.roles.cache.find(
        (r) => r.name.toLowerCase().trim() == "@everyone"
      ),
      { SEND_MESSAGES: false }
    )
    .catch(() => {});

  message.channel.sendSuccessMessage(
    `${replace(language.SUCCESS, {
      "{channel}": channel,
    })}`
  );
};
