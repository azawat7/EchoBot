const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "setprefix",
  aliases: ["prefix"],
  category: "admin",
  expectedArgs: "`<new_prefix>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🗜",
};

module.exports.run = async (client, message, args, language, settings) => {
  if (args[0].length > 3) {
    return message.channel.sendErrorMessage(`${language.ERROR}`);
  }

  const newPrefix = args.slice(0).join(" ");

  if (newPrefix) {
    await client.updateGuild(message.guild, { prefix: newPrefix });
    return message.channel.sendSuccessMessage(
      `${language.UPDATEDPREFIX} \`${settings.prefix}\` -> \`${newPrefix}\``
    );
  }
};
