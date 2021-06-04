const { Collection, Message } = require("discord.js");
const { MessageEmbed, TextChannel } = require("discord.js");
const { Client } = require("discord.js");
const DisTube = require("distube");
const { DiscordTogether } = require("discord-together");
const GiveawayManagerWithOwnDatabase = require("./util/giveaways");
require("dotenv").config();

///////////////////////////////////////////
const client = new Client();

module.exports = client;

///////////////////////////////////////////
require("./util/functions.js")(client);
require("./util/dbFunctions")(client);
///////////////////////////////////////////

TextChannel.prototype.sendErrorMessage = function (content, file) {
  const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setDescription(`${client.emoji.cross} **${content}**`);
  return this.send(embed, file);
};

// Config
client.config = require("./config");
client.colors = require("./assets/colors.json");
client.emoji = require("./assets/emojis.json");
// Clients
client.discordTogether = new DiscordTogether(client);
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
});

const embed = new MessageEmbed().setColor(client.colors.echo);
///////////////////////////////////////////

const manager = new GiveawayManagerWithOwnDatabase(client, {
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    embedColorEnd: "#000000",
    reaction: "🎉",
  },
});

client.giveawaysManager = manager;

///////////////////////////////////////////

["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

///////////////////////////////////////////

client.mongoose = require("./util/mongo");

///////////////////////////////////////////

const { loadCommands, loadEvents } = require("./util/loaders");
loadCommands(client);
loadEvents(client);

///////////////////////////////////////////

// const status = (queue) =>
//   `Volume: \`${queue.volume}%\` | Filter: \`${
//     queue.filter || "Off"
//   }\` | Loop: \`${
//     queue.repeatMode
//       ? queue.repeatMode === 2
//         ? "All Queue"
//         : "This Song"
//       : "Off"
//   }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// client.distube
//   .on("playSong", (message, queue, song) => {
//     embed.setDescription(
//       `${client.emoji.music} **| Now Playing** \`${song.name}\` - \`${song.formattedDuration}\` \n>>> ${client.emoji.check} **| Requested by** ${song.user}`
//     );
//     message.channel.send(embed);
//   })
//   .on("addSong", (message, queue, song) =>
//     message.channel.send(
//       `$ | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
//     )
//   )
//   .on("playList", (message, queue, playlist, song) =>
//     message.channel.send(
//       `${client.emotes.play} | Play \`${playlist.title}\` playlist (${
//         playlist.total_items
//       } songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${
//         song.formattedDuration
//       }\`\n${status(queue)}`
//     )
//   )
//   .on("addList", (message, queue, playlist) =>
//     message.channel.send(
//       `$ | Added \`${playlist.title}\` playlist (${
//         playlist.total_items
//       } songs) to queue\n${status(queue)}`
//     )
//   )
//   // DisTubeOptions.searchSongs = true
//   .on("searchResult", (message, result) => {
//     let i = 0;
//     message.channel.send(
//       `**Choose an option from below**\n${result
//         .map(
//           (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
//         )
//         .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     );
//   })
//   // DisTubeOptions.searchSongs = true
//   .on("searchCancel", (message) =>
//     message.channel.send(` | Searching canceled`)
//   )
//   .on("error", (message, err) => {
//     console.log(err);
//     if (err.includes("User is not in the voice channel."))
//       return message.channel.send(` | no voice: ${err}`);

//     message.channel.send(` | err: ${err}`);
//   });

///////////////////////////////////////////

console.log("----------------------------");
client.mongoose.init();

client.login(process.env.TOKEN);
