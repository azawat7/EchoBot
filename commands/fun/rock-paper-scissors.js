const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "rock-paper-scissors",
  aliases: ["rockpaperscissors", "rps"],
  category: "fun",
  expectedArgs: "`[@Member]`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: ":rock:",
  //   enabled: true,
};

module.exports.run = async (
  client,
  message,
  args,
  language,
  settings,
  userInfo
) => {
  const activeRow = new MessageActionRow().addComponents([
    new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("rps-rock")
      .setEmoji("🪨"),
    new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("rps-paper")
      .setEmoji("🧻"),
    new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("rps-scissors")
      .setEmoji("✂️"),
  ]);
  const disabledRow = new MessageActionRow().addComponents([
    new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("rps-rock")
      .setEmoji("🪨")
      .setDisabled(true),
    new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("rps-paper")
      .setEmoji("🧻")
      .setDisabled(true),
    new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("rps-scissors")
      .setEmoji("✂️")
      .setDisabled(true),
  ]);
  if (!args.length) {
    let userChoice;
    let aiChoice;
    let userChoiceString;
    let aiChoiceString;

    const embed = new MessageEmbed()
      .setTitle(`${message.author.tag} - ${client.user.tag}`)
      .setColor(client.colors.echo)
      .setDescription(`**${language.START}**`);

    const msg = await message.channel.send({
      embeds: [embed],
      components: [activeRow],
    });

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = await msg.createMessageComponentCollector({
      filter,
      time: 15000,
    });
    collector.on("collect", (i) => {
      const tag = i.customId.split("-");
      const replyEmbed = new MessageEmbed().setDescription(
        r(language.REPLY, {
          "{gameid}": `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}`,
        })
      );
      if (tag[1] === "rock") {
        userChoice = 1;
        userChoiceString = "🪨";
        i.reply({ embeds: [replyEmbed], ephemeral: true });
        collector.stop();
      }
      if (tag[1] === "paper") {
        userChoice = 2;
        userChoiceString = "🧻";
        i.reply({ embeds: [replyEmbed], ephemeral: true });
        collector.stop();
      }
      if (tag[1] === "scissors") {
        userChoice = 3;
        userChoiceString = "✂️";
        i.reply({ embeds: [replyEmbed], ephemeral: true });
        collector.stop();
      }
    });
    collector.on("end", async (collected) => {
      if (!collected.size) {
        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${client.user.tag}`)
          .setDescription(`**${language.ai.NOCHOICE}**`);
        return msg.edit({ embeds: [embed], components: [disabledRow] });
      }

      if (!message.deleted && message.deletable) {
        msg.edit({ components: [disabledRow] });
      }

      aiChoice = Math.floor(Math.random() * 3 + 1);
      if (aiChoice === 1) {
        aiChoiceString = "🪨";
      } else if (aiChoice === 2) {
        aiChoiceString = "🧻";
      } else if (aiChoice === 3) {
        aiChoiceString = "✂️";
      }
      if (userChoice === aiChoice) {
        await client.updateUserInfo(message.guild, message.author, {
          "users.$.games.rps.draws.ai": userInfo.games.rps.draws.ai + 1,
        });

        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${client.user.tag}`)
          .setDescription(`**${language.ai.DRAW}**`)
          .setFooter(
            r(language.ai.FOOTER, {
              "{userPick}": userChoiceString,
              "{aiPick}": aiChoiceString,
            })
          );
        msg.edit({ embeds: [embed], components: [disabledRow] });
      } else if (
        (userChoice === 1 && aiChoice === 3) ||
        (userChoice === 2 && aiChoice === 1) ||
        (userChoice === 3 && aiChoice === 2)
      ) {
        await client.updateUserInfo(message.guild, message.author, {
          "users.$.games.rps.wins.ai": userInfo.games.rps.wins.ai + 1,
        });

        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${client.user.tag}`)
          .setDescription(`**${language.ai.WIN}**`)
          .setFooter(
            r(language.ai.FOOTER, {
              "{userPick}": userChoiceString,
              "{aiPick}": aiChoiceString,
            })
          );
        msg.edit({ embeds: [embed], components: [disabledRow] });
      } else {
        await client.updateUserInfo(message.guild, message.author, {
          "users.$.games.rps.loses.ai": userInfo.games.rps.loses.ai + 1,
        });

        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${client.user.tag}`)
          .setDescription(`**${language.ai.LOSE}**`)
          .setFooter(
            r(language.ai.FOOTER, {
              "{userPick}": userChoiceString,
              "{aiPick}": aiChoiceString,
            })
          );

        msg.edit({ embeds: [embed], components: [disabledRow] });
      }
    });
  } else {
    const member = message.mentions.members.first();
    if (!member) return message.channel.sendErrorMessage(language.user.NOUSER);
    if (member.id === message.author.id)
      return message.channel.sendErrorMessage(language.user.AUTHOR);

    const embed = new MessageEmbed()
      .setTitle(`${message.author.tag} - ${member.user.tag}`)
      .setColor(client.colors.echo)
      .setDescription(`**${language.START}**`);

    const msg = await message.channel.send({
      embeds: [embed],
      components: [activeRow],
    });
    const filter = (interaction) =>
      interaction.user.id === message.author.id ||
      interaction.user.id === member.id;
    const collector = await msg.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    let userChoice;
    let opponentChoice;
    let userChoiceString;
    let opponentChoiceString;

    collector.on("collect", (i) => {
      const tag = i.customId.split("-");

      if (tag[1] === "rock") {
        const rockEmbed = new MessageEmbed().setDescription(language.user.ROCK);
        i.reply({ embeds: [rockEmbed], ephemeral: true });
        if (i.user.id === message.author.id) {
          userChoice = 1;
          userChoiceString = "🪨";
        } else if (i.user.id === member.id) {
          opponentChoice = 1;
          opponentChoiceString = "🪨";
        }
      }
      if (tag[1] === "paper") {
        const paperEmbed = new MessageEmbed().setDescription(
          language.user.PAPER
        );
        i.reply({ embeds: [paperEmbed], ephemeral: true });
        if (i.user.id === message.author.id) {
          userChoice = 2;
          userChoiceString = "🧻";
        } else if (i.user.id === member.id) {
          opponentChoice = 2;
          opponentChoiceString = "🧻";
        }
      }
      if (tag[1] === "scissors") {
        const scissorsEmbed = new MessageEmbed().setDescription(
          language.user.SCISSORS
        );
        i.reply({ embeds: [scissorsEmbed], ephemeral: true });
        if (i.user.id === message.author.id) {
          userChoice = 3;
          userChoiceString = "✂️";
        } else if (i.user.id === member.id) {
          opponentChoice = 3;
          opponentChoiceString = "✂️";
        }
      }
      if (userChoice && opponentChoice) {
        collector.stop();
      }
    });

    collector.on("end", async (collected) => {
      if (!collected.size) {
        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${member.user.tag}`)
          .setDescription(`**${language.user.NOPICKS}**`);
        return msg.edit({ embeds: [embed], components: [disabledRow] });
      } else if (collected.size == 1) {
        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${member.user.tag}`)
          .setDescription(`**${language.user.NOPICK}**`);
        return msg.edit({ embeds: [embed], components: [disabledRow] });
      }

      const replyEmbed = new MessageEmbed().setDescription(
        r(language.REPLY, {
          "{gameid}": `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}`,
        })
      );
      message.channel.send({ embeds: [replyEmbed] });

      if (!message.deleted && message.deletable) {
        msg.edit({ components: [disabledRow] });
      }

      if (userChoice === opponentChoice) {
        await client.updateUserInfo(message.guild, message.author, {
          "users.$.games.rps.draws.user": userInfo.games.rps.draws.user + 1,
        });

        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${member.user.tag}`)
          .setDescription(`**${language.ai.DRAW}**`)
          .setFooter(
            r(language.user.FOOTER, {
              "{userPick}": userChoiceString,
              "{aiPick}": opponentChoiceString,
              "{user}": message.author.username,
              "{opponent}": member.user.username,
            })
          );
        msg.edit({ embeds: [embed], components: [disabledRow] });
      } else if (
        (userChoice === 1 && opponentChoice === 3) ||
        (userChoice === 2 && opponentChoice === 1) ||
        (userChoice === 3 && opponentChoice === 2)
      ) {
        await client.updateUserInfo(message.guild, message.author, {
          "users.$.games.rps.wins.user": userInfo.games.rps.wins.user + 1,
        });

        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${member.user.tag}`)
          .setDescription(
            `**${r(language.user.WIN, { "{user}": message.author.tag })}**`
          )
          .setFooter(
            r(language.user.FOOTER, {
              "{userPick}": userChoiceString,
              "{aiPick}": opponentChoiceString,
              "{user}": message.author.username,
              "{opponent}": member.user.username,
            })
          );
        msg.edit({ embeds: [embed], components: [disabledRow] });
      } else {
        await client.updateUserInfo(message.guild, message.author, {
          "users.$.games.rps.loses.user": userInfo.games.rps.loses.user + 1,
        });

        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag} - ${member.user.tag}`)
          .setDescription(
            `**${r(language.user.WIN, { "{user}": member.user.tag })}**`
          )
          .setFooter(
            r(language.user.FOOTER, {
              "{userPick}": userChoiceString,
              "{aiPick}": opponentChoiceString,
              "{user}": message.author.username,
              "{opponent}": member.user.username,
            })
          );

        msg.edit({ embeds: [embed], components: [disabledRow] });
      }
    });
  }
};
