const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

module.exports.help = {
  name: "setlanguage",
  aliases: ["setlang", "language", "lang"],
  category: "admin",
  expectedArgs: "`<new_language>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  nsfw: false,
  cooldown: 3,
  example: 1,
  enabled: false,
};

module.exports.run = async (client, message, args, language, settings) => {
  message.channel.send("Command is not available right now !");
  // let languages = ["english"];

  // const sembed = new MessageEmbed().setColor("#f50041").setDescription(
  //   `**${client.emoji.cross}  ${replace(language.SETLANGUAGE1, {
  //     "{languages}": ">>> :flag_us: `english`",
  //   })}**`
  // );

  // const aembed = new MessageEmbed()
  //   .setColor("#f50041")
  //   .setDescription(`**${client.emoji.cross} ${language.SETLANGUAGE2}**`);

  // const newSetting = args.slice(0).join(" ");

  // if (!languages.includes(args[0].toLowerCase()))
  //   return message.channel.send(sembed);

  // if (args[0] === settings.language) return message.channel.send(aembed);

  // const actLang = new MessageEmbed()
  //   .setColor("#f50041")
  //   .setDescription(
  //     `**${language.SETLANGUAGE3}** \`${
  //       settings.language
  //     }\` -> \`${newSetting.toLowerCase()}\``
  //   );

  // if (args.length) {
  //   await client.updateGuild(message.guild, { language: args[0] });
  //   return message.channel.send(actLang);
  // }
};
