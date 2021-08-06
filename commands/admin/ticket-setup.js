const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "ticket-setup",
  aliases: ["ticketsetup"],
  category: "admin",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "📨",
  admin: true,
  enabled: false,
};

module.exports.run = async (client, message, args, language, settings) => {
  let panelEmbedTitle;
  let panelEmbedDescription;
  let panelEmbedFooter;

  let welcomeEmbedTitle;
  let welcomeEmbedDescription;
  let welcomeEmbedFooter;

  let closedEmbedTitle;
  let closedEmbedDescription;
  let closedEmbedFooter;

  let reopenEmbedTitle;
  let reopenEmbedDescription;
  let reopenEmbedFooter;

  let deleteEmbedTitle;
  let deleteEmbedDescription;
  let deleteEmbedFooter;

  let panelButton;
  let loseButton;
  let reopenButton;
  let deleteButton;

  const embed = new MessageEmbed().setColor(client.colors.echo);
  const baseEmbed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setDescription(
      "Please choose if you want to do a interactive or any setup (type `interactive` or `any`). If you do not respond in 30 seconds, the setup will be stoped."
    );

  const msg = await message.channel.send({ embeds: [baseEmbed] });

  msg;
  const filter = (m) => m.author.id === message.author.id;
  const collector = message.channel.createMessageCollector({
    filter,
    time: 3000,
  });
  collector.on("collect", (m) => {
    if (m.content.toLowerCase() === "interactive") {
      collector.stop();
      return m.delete();
    } else if (m.content.toLowerCase() === "any") {
      collector.stop();
      return m.delete();
    }
    m.delete();
  });
  collector.on("end", (collected) => {
    const lastKey = collected.lastKey();
    if (!lastKey) {
      return console.log(false);
    }
    if (lastKey == "any" || "interactive") {
      return console.log(true);
    }
    if (lastKey != "any" || "interactive") return console.log("test");

    console.log(`Collected ${collected.get(lastKey)}`);
  });
};
