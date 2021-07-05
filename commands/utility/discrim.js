const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "discrim",
  aliases: [
    "discriminator",
    "discrims",
    "discrim-search",
    "discriminator-search",
  ],
  category: "utility",
  expectedArgs: "`<dicriminator>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🆔",
};

module.exports.run = async (client, message, args, language, settings) => {
  if (!/^\d{4}$/.test(args[0])) {
    return message.channel.sendErrorMessage(language.NODISCRIM);
  }

  const guild = client.guilds.cache.get("838062586615955466");

  let members = guild.members.cache
    .filter((user) => user.discriminator === args[0])
    .map((user) => user.tag);
  let total = members.length;
  if (members.length === 0) {
    await message.channel.sendErrorMessage(
      `${r(language.NONE, { "{discrim}": args[0] })}`
    );
  } else {
    members =
      members.length > 0
        ? members.slice(0, 10).join(" `|` ")
        : `\`${language.NONE}\``;

    await message.channel.send({
      embed: {
        color: client.colors.echo,
        description: `**${client.emoji.check} ${r(language.DES, {
          "{total}": total,
          "{tag}": args[0] || message.author.discriminator,
        })}**`,
        fields: [
          {
            name: `${language.FIELD}`,
            value:
              total > 10
                ? `${r(language.MORETEN, {
                    "{members}": members,
                    "{number}": `${total - 10}`,
                  })}`
                : members,
          },
        ],
      },
    });
  }
};
