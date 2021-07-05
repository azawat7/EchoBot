const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "auto-role",
  aliases: ["autorole"],
  category: "admin",
  expectedArgs: "`<on/off> <@role>`",
  minArgs: 1,
  maxArgs: 2,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "🎭",
};

module.exports.run = async (client, message, args, language, settings) => {
  const role = message.mentions.roles.first();
  if (args[0].toLowerCase() === "on") {
    if (settings.autoRole.enabled === true) {
      return message.channel.sendErrorMessage(`${language.ALENABLED}`);
    }
    if (!args[1]) {
      return message.channel.sendErrorMessage(`${language.ROLE}`);
    }
    await client.updateGuild(message.guild, {
      autoRole: { enabled: true, role: role },
    });
    return message.channel.sendSuccessMessage(
      `${r(language.ENABLED, {
        "{role}": `${role}`,
      })}`
    );
  } else if (args[0].toLowerCase() === "off") {
    if (settings.autoRole.enabled === false) {
      return message.channel.sendErrorMessage(`${language.ALDISABLED}`);
    }
    await client.updateGuild(message.guild, {
      autoRole: { enabled: false, role: "undefined" },
    });
    return message.channel.sendSuccessMessage(`${language.DISABLED}`);
  } else {
    return message.channel.sendErrorMessage(`${language.INVALIDARGS}`);
  }
};
