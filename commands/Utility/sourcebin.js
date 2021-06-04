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
};

module.exports.run = async (client, message, args, language) => {
  const content = args.slice(2).join(" ");
  const titled = args[0];
  const languaged = args[1];

  const sembed = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `**${client.emoji.cross} ${language.ERROR} \`js\`, \`html\`, \`css\` !**`
    );

  if (!["js", "html", "css"].includes(languaged))
    return message.channel.send(sembed);

  create(
    [
      {
        name: "random code",
        content,
        language: languaged,
      },
    ],
    {
      title: titled,
      description: `${languaged} code.`,
    }
  ).then((value) => {
    const embed = new MessageEmbed()
      .setColor("#f50041")
      .setDescription(
        `**${client.emoji.check} ${language.SUC} \`${value.url}\`**`
      );
    message.channel.send(embed);
  });
};
