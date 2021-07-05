const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const d = require("replacer-js");

module.exports.help = {
  name: "giveaway-panel",
  aliases: ["gpanel"],
  category: "moderation",
  expectedArgs: "`<giveaway_id>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "🎲",
};

module.exports.run = async (client, message, args, language) => {
  let giveaway =
    client.giveawaysManager.giveaways.find(
      (g) => g.guildID === message.guild.id && g.prize === args.join(" ")
    ) ||
    client.giveawaysManager.giveaways.find(
      (g) => g.guildID === message.guild.id && g.messageID === args[0]
    );
  if (!giveaway)
    return message.channel.sendErrorMessage(
      d(language.NOGIVEAWAY, {
        "{id}": args.join(" "),
      })
    );

  let isgiveawayended =
    client.giveawaysManager.giveaways.find(
      (g) =>
        g.guildID === message.guild.id &&
        g.prize === args.join(" ") &&
        g.ended === true
    ) ||
    client.giveawaysManager.giveaways.find(
      (g) =>
        g.guildID === message.guild.id &&
        g.messageID === args[0] &&
        g.ended === true
    );

  const messageID = args[0];

  const deleteb = new MessageButton()
    .setStyle("grey")
    .setID("deletebutton")
    .setEmoji("❌")
    .setLabel("Delete");

  const rerollb = new MessageButton()
    .setStyle("grey")
    .setID("rerollbutton")
    .setEmoji("🔁")
    .setLabel("Reroll");

  const endb = new MessageButton()
    .setStyle("grey")
    .setID("endbutton")
    .setEmoji("⏹")
    .setLabel("End");

  const deleteb_disabled = new MessageButton()
    .setStyle("grey")
    .setID("deletebuttonbb")
    .setEmoji("❌")
    .setLabel("Delete")
    .setDisabled();

  const rerollb_disabled = new MessageButton()
    .setStyle("grey")
    .setID("rerollbuttonbb")
    .setEmoji("🔁")
    .setLabel("Reroll")
    .setDisabled();

  const endb_disabled = new MessageButton()
    .setStyle("grey")
    .setID("endbuttonbb")
    .setEmoji("⏹")
    .setLabel("End")
    .setDisabled();

  const buttons_enabled = new MessageActionRow().addComponents([
    deleteb,
    rerollb,
    endb,
  ]);

  const buttons_disabled = new MessageActionRow().addComponents([
    deleteb_disabled,
    rerollb_disabled,
    endb_disabled,
  ]);

  if (isgiveawayended) {
    const buttons_enabled_ened = new MessageActionRow().addComponents([
      deleteb,
      rerollb,
      endb_disabled,
    ]);

    const buttons_disabled_ened = new MessageActionRow().addComponents([
      deleteb_disabled,
      rerollb_disabled,
      endb_disabled,
    ]);

    let embeds = new MessageEmbed()
      .setColor(client.colors.echo)
      .setAuthor(`📟 ${language.TITLE}`)
      .setDescription(
        `
        **${language.DES}**
      `
      )
      .setFooter(`Giveaway ID : ${messageID}`);

    message.channel
      .send({
        embeds: [embeds],
        components: buttons_enabled_ened,
      })
      .then((msg) => {
        const collector = msg.createButtonCollector(
          (button) => button.clicker.user.id === message.author.id,
          { time: 60000 }
        );
        collector.on("collect", (button) => {
          if (button.id === "deletebutton") {
            ////////
            button.defer(true);
            client.giveawaysManager
              .delete(messageID)
              .then(() => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_disabled_ened,
                });
              })
              .catch((err) => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_disabled_ened,
                });
              });
          } else if (button.id === "rerollbutton") {
            ////////
            button.defer(true);
            client.giveawaysManager
              .reroll(messageID, {
                messages: {
                  congrat: language.CONGRATREROLL,
                  error:
                    "**" +
                    client.emoji.cross +
                    "**" +
                    language.ERRORREROLL +
                    "**",
                },
              })
              .then(() => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_enabled_ened,
                });
              })
              .catch((err) => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_enabled_ened,
                });
              });
          }
        });
        collector.on("end", (collected) => {
          msg.edit({ component: buttons_disabled_ened });
        });
      });
  } else {
    const buttons_enabled_ened_reror = new MessageActionRow().addComponents([
      deleteb,
      rerollb_disabled,
      endb,
    ]);

    const buttons_enabled_ened_rerorr = new MessageActionRow().addComponents([
      deleteb,
      rerollb,
      endb_disabled,
    ]);

    const buttons_disabled_ened = new MessageActionRow().addComponents([
      deleteb_disabled,
      rerollb_disabled,
      endb_disabled,
    ]);
    let embeds = new MessageEmbed()
      .setColor(client.colors.echo)
      .setAuthor(`📟 ${language.TITLE}`)
      .setDescription(
        `
        **${language.DES}**
      `
      )
      .setFooter(`Giveaway ID : ${messageID}`);

    message.channel
      .send({
        embeds: [embeds],
        components: buttons_enabled_ened_reror,
      })
      .then((msg) => {
        const collector = msg.createButtonCollector(
          (button) => button.clicker.user.id === message.author.id,
          { time: 60000 }
        );
        collector.on("collect", (button) => {
          if (button.id === "deletebutton") {
            ////////
            button.defer(true);
            client.giveawaysManager
              .delete(messageID)
              .then(() => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_disabled_ened,
                });
              })
              .catch((err) => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_disabled_ened,
                });
              });
          } else if (button.id === "rerollbutton") {
            ////////
            button.defer(true);
            client.giveawaysManager
              .reroll(messageID, {
                messages: {
                  congrat: language.CONGRATREROLL,
                  error:
                    "**" +
                    client.emoji.cross +
                    "**" +
                    language.ERRORREROLL +
                    "**",
                },
              })
              .then(() => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_enabled_ened_rerorr,
                });
              })
              .catch((err) => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_enabled_ened_rerorr,
                });
              });
          } else if (button.id === "endbutton") {
            ////////
            button.defer(true);
            client.giveawaysManager
              .end(messageID)
              .then(() => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_enabled_ened_rerorr,
                });
              })
              .catch((err) => {
                button.message.edit({
                  embeds: [embeds],
                  components: buttons_enabled_ened_rerorr,
                });
              });
          }
        });
        collector.on("end", (collected) => {
          msg.edit({ embeds: [embeds], component: buttons_disabled_ened });
        });
      });
  }
};
