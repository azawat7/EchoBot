const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "toggle-command",
  aliases: ["togglecommand", "toggle"],
  category: "admin",
  expectedArgs: "`<new_prefix>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🔘",
  // enabled: false,
};

module.exports.run = async (client, message, args, language, settings) => {
  const non = ["help", "configuration", "toggle-command", "test"];

  non.forEach((n) => {
    if (args[0].includes(n)) {
      return message.channel.sendErrorMessage(`${language.ERR}`);
    }
  });

  const command = client.commands.get(args[0]);
  if (!command) {
    return message.channel.sendErrorMessage(language.ERROR);
  }

  const name = command.help.name;

  if (!settings.commands.includes(name)) {
    settings.commands.push(name);
    message.channel.sendSuccessMessage(
      r(language.DISABLED, {
        "{cmd}": name,
      })
    );
  } else {
    settings.commands.pull(name);
    message.channel.sendSuccessMessage(
      r(language.ENABLED, {
        "{cmd}": name,
      })
    );
  }

  await settings.save().catch(() => {});
};
