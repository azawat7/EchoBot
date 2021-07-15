const d = require("replacer-js");
const { Guild } = require("../../models/index");

module.exports.help = {
  name: "set-level-logs",
  aliases: ["setlevellogs", "setlvllogs", "setlevellog"],
  category: "level",
  expectedArgs: "`<#channel>`",
  minArgs: 1,
  maxArgs: 2,
  ownerOnly: false,
  userPerms: ["MANAGE_CHANNELS"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "📊🧾",
};

module.exports.run = async (
  client,
  message,
  args,
  language,
  settings,
  userInfo
) => {
  // if (channel) {
  //   if (settings.logs.lvlena === false) {
  //     client.updateGuild(message.guild, {
  //       logs: { levels: channel.id, lvlena: true },
  //     });
  //     message.channel.sendSuccessMessage(
  //       d(language.SUCCESS, { "{channel}": `<#${channel.id}>` })
  //     );
  //   }
  // } else {
  //   message.channel.sendErrorMessage(language.ERR);
  // }
  // if (settings.logs.lvlena === true) {
  //   client.updateGuild(message.guild, {
  //     logs: { lvlena: false },
  //   });
  //   message.channel.sendSuccessMessage(language.SUCCESS2);
  // }

  if (args[0].toLowerCase() === "on") {
    if (settings.logs.lvlena === true) {
      return message.channel.sendErrorMessage(`${language.ALENABLED}`);
    }
    const channel = message.mentions.channels.first();
    await client.updateGuild(message.guild, {
      logs: { lvlena: true, levels: channel.id },
    });
    return message.channel.sendSuccessMessage(
      `${d(language.ENABLED, {
        "{channel}": `<#${channel.id}>`,
      })}`
    );
  } else if (args[0].toLowerCase() === "off") {
    if (settings.logs.lvlena === false) {
      return message.channel.sendErrorMessage(`${language.ALDISABLED}`);
    }
    await client.updateGuild(message.guild, { logs: { lvlena: false } });
    return message.channel.sendSuccessMessage(`${language.DISABLED}`);
  } else {
    return message.channel.sendErrorMessage(`${language.INVALIDARGS}`);
  }
};
