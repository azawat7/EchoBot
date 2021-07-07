const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "warn",
  aliases: [],
  category: "moderation",
  expectedArgs: "`<@user>` `[reason]`",
  minArgs: 1,
  maxArgs: 2,
  ownerOnly: true,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  moderator: true,
  emoji: "❗",
  // hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  let guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return "W_" + s4() + s4() + "-" + s4() + "-" + s4();
  };

  const memberR = message.mentions.users.first();
  const reason = args[1] || language.NOREASON;
  const id = guid();

  client.createUserWarn(message.guild, {
    target: memberR.id,
    id: id,
    date: Date.now(),
    mod: message.author.id,
    reason: reason,
  });

  message.channel.sendSuccessMessage(
    r(language.SUCCESS, {
      "{user}": memberR,
      "{reason}": reason,
      "{mod}": `<@${message.author.id}>`,
      "{id}": id,
    })
  );
};
