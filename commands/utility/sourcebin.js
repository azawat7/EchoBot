const { MessageEmbed } = require("discord.js");
const { create } = require("sourcebin");

module.exports.help = {
  name: "sourcebin",
  aliases: ["sbin"],
  category: "utility",
  expectedArgs: "`<title>` `<language>` `<js_code>`",
  minArgs: 3,
  maxArgs: null,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 3,
  emoji: "🎇",
};

module.exports.run = async (client, message, args, language) => {
  const content = args.slice(2).join(" ");
  const titled = args[0];
  const languaged = args[1];

  if (!["js", "html", "css"].includes(languaged))
    return message.channel.sendErrorMessage(
      `**${language.ERROR} \`js\`, \`html\`, \`css\` !**`
    );

  create(
    [
      {
        name: "random code",
        content,
        language: languaged.toLowerCase(),
      },
    ],
    {
      title: titled,
      description: `${languaged.toLowerCase()} code.`,
    }
  ).then((value) => {
    message.channel.sendSuccessMessage(`**${language.SUC} \`${value.url}\`**`);
  });
};
