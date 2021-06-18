const { MessageEmbed } = require("discord.js");
const { lang } = require("moment");
const ms = require("ms");

module.exports.help = {
  name: "giveawaycreate",
  aliases: ["gcreate"],
  category: "moderation",
  expectedArgs: "`<time_in_m/h/d>` `<number_of_winner>` `<prize>`",
  minArgs: 1,
  maxArgs: null,
  ownerOnly: false,
  userPerms: ["MENTION_EVERYONE"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
};

module.exports.run = async (client, message, args, language) => {
  const status = args[0];

  const MAX_COUNT = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.MAXCOUNT}**`);

  const INVTIME = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.INVTIMES}**`);

  const MAXTIME = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.MAXTIMES}**`);

  const TOOWINERS = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.TOOWINER}**`);

  const currentGiveaways = client.giveawaysManager.giveaways.filter(
    (g) => g.guildID === message.guild.id && !g.ended
  ).length;
  if (currentGiveaways > 3) {
    return message.channel.send(MAX_COUNT);
  }
  const time = args[0];

  if (isNaN(ms(time))) {
    return message.channel.send(INVTIME);
  }

  if (ms(time) > ms("14d")) {
    return message.channel.send(MAXTIME);
  }

  const winnersCount = args[1];

  if (isNaN(winnersCount) || winnersCount > 10 || winnersCount < 1) {
    return message.channel.send(TOOWINERS);
  }

  const prize = args.slice(2).join(" ");

  client.giveawaysManager.start(message.channel, {
    time: ms(time),
    hostedBy: message.author,
    prize: prize,
    winnerCount: parseInt(winnersCount),
    messages: {
      giveaway: `${language.GIVEAWAY}`,
      giveawayEnded: `${language.GIVEAWAYENDED}`,
      timeRemaining: `${language.TIMEREMAINING}`,
      inviteToParticipate: `${language.INVITETOPARTICIPATE}`,
      winMessage: `${language.WINMESSAGE}`,
      embedFooter: `${language.EMBEDFOOTER}`,
      noWinner: `${language.NOWINNER}`,
      hostedBy: `${language.HOSTEDBY}`,
      winners: `${language.WINNERS}`,
      endedAt: `${language.ENDEDAT}`,
      units: {
        seconds: `${language.SECONDS}`,
        minutes: `${language.MINUTES}`,
        hours: `${language.HOURS}`,
        days: `${language.DAYS}`,
        pluralS: false, // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
      },
    },
  });
};
