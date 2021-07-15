const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require("ms");
const { Guild } = require("../../models/index");

module.exports.help = {
  name: "giveaway-create",
  aliases: ["gcreate"],
  category: "moderation",
  expectedArgs: "`<time_in_m/h/d>` `<number_of_winner>` `<prize>`",
  minArgs: 3,
  maxArgs: null,
  ownerOnly: false,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🎁",
};

module.exports.run = async (client, message, args, language, settings) => {
  const prize = args.slice(2).join(" ");
  const winnerCount = args[1];
  const time = ms(args[0]);

  const realTime = Math.floor(time * 0.001 + Date.now() * 0.001);

  ///////////////////////////////////////
  ///////////////////////////////////////
  const reroll = new MessageButton()
    .setLabel("Reroll")
    .setCustomId(`giveawaysddd-reroll-${message.author.id}`)
    .setStyle("SECONDARY")
    .setDisabled(true);
  const end = new MessageButton()
    .setLabel("End")
    .setStyle("DANGER")
    .setCustomId(`giveaways-end-${message.author.id}`);
  const enter = new MessageButton()
    .setLabel("Enter")
    .setStyle("PRIMARY")
    .setCustomId(`giveaways-enter-${message.author.id}`);

  const rerolldd = new MessageButton()
    .setLabel("Reroll")
    .setCustomId(`giveaways-reroll-${message.author.id}`)
    .setStyle("SECONDARY");
  const enddd = new MessageButton()
    .setLabel("End")
    .setStyle("SECONDARY")
    .setCustomId(`giveaways-end-${message.author.id}`)
    .setDisabled(true);
  const enterdd = new MessageButton()
    .setLabel("Enter")
    .setStyle("SECONDARY")
    .setCustomId(`giveaways-enter-${message.author.id}`)
    .setDisabled(true);

  const buttons = new MessageActionRow().addComponents([enter, end, reroll]);
  const err = new MessageActionRow().addComponents([enterdd, enddd, reroll]);
  const onlyR = new MessageActionRow().addComponents([enterdd, enddd, reroll]);

  const embed = new MessageEmbed()
    .setColor("BLURPLE")
    .setTitle(`${client.emoji.gift} ${client.capitalize(prize)}`)
    .setDescription(
      `__**Information :**__\n**• 🎊 Host :** <@${message.author.id}>\n**• 👨‍💻 Number Of Winners :** \`${winnerCount}\`\n**• 🕛 Ends : <t:${realTime}:R>** ***(<t:${realTime}:F>)***`
    )
    .setFooter(`{echo} | Active`)
    .setTimestamp();
  ///////////////////////////////////////
  ///////////////////////////////////////

  const msg = await message.channel.send({
    components: [buttons],
    embeds: [embed],
  });

  msg;

  settings.giveaways.push({
    messageID: msg.id,
    channelID: message.channel.id,
    guildID: message.guild.id,
    host: message.author.id,
    winners: parseInt(winnerCount),
    prize: prize,
    startAt: Date.now(),
    endAt: realTime,
    ended: false,
    clickers: [],
  });

  await settings.save().catch(() => {});

  client.setSecondTimeout(async function () {
    const check = await client.isGiveawayEnded(message.guild.id, msg.id);
    if (check === true) {
      return;
    }
    if (check === false) {
      const newSettings = await client.getNewGuild(message.guild);
      const data = await newSettings.giveaways.filter(
        (g) => g.messageID === msg.id
      );
      const winners = await choose(data[0].winners, data, data[0].host);
      if (!winners) {
        const gembbed = new MessageEmbed()
          .setColor("GREY")
          .setTitle(
            `**${client.emoji.gift} ${client.capitalize(data[0].prize)}**`
          )
          .setDescription(
            `**No valid entrants. No winner could be determined !**\n\n__**Information :**__\n**• 🎊 Host :** <@${message.author.id}>\n**• 👨‍💻 Winners :** \`None\``
          )
          .setFooter(`{echo} | Ended`)
          .setTimestamp();
        const link = new MessageEmbed()
          .setColor("BLURPLE")
          .setDescription(
            `[↗](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id})`
          );
        msg.edit({ components: [err], embeds: [gembbed] });
        return message.channel.send({
          content: `No valid entrants, so there is no winner !`,
          embeds: [link],
        });
      }
      const endEmbed = new MessageEmbed()
        .setColor("GREY")
        .setTitle(
          `**${client.emoji.gift} ${client.capitalize(data[0].prize)}**`
        )
        .setDescription(
          `**Giveaway ended !**\n\n__**Information :**__\n**• 🎊 Host :** <@${
            data[0].host
          }>\n**• 👨‍💻 Winner(s) :** ${winners
            .map((winner) => `<@${winner}>`)
            .join(", ")}`
        )
        .setFooter(`{echo} | Ended`)
        .setTimestamp();
      const links = new MessageEmbed()
        .setColor("BLURPLE")
        .setDescription(
          `[↗](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id})`
        );
      msg.edit({ embeds: [endEmbed], components: [onlyR] });
      message.channel.send({
        content: `**${client.emoji.trophy} Congratulation ${winners
          .map((winner) => `<@${winner}>`)
          .join(", ")} ! You won \`${client.capitalize(data[0].prize)}\` !**`,
        embeds: [links],
      });
    }
  }, ms(args[0]) / 1000);
};

async function choose(winners, data, host) {
  if (winners > data[0].clickers.length + 1) return null;

  const final = [];

  for (let i = 0; i < winners; i++) {
    if (!data[0].clickers) return null;

    const oneWinner = data[0].clickers[Math.floor(Math.random() * 1)];
    if (oneWinner === host) return i - 1;

    if (!oneWinner) return null;

    final.push(oneWinner);
  }
  return final.length ? final : null;
}
