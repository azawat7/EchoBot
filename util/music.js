const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js");
const { Guild } = require("../models/index");

module.exports = {
  async play(song, message, client) {
    const guildDB = await Guild.findOne({
      guildID: message.guild.id,
    });
    const lan = require(`../languages/${guildDB.language}/music`);
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed().setColor("#f50041");

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      embed.setDescription(
        `**<:echo_cross:840852256416595998> ${lan.MUSICEND}**`
      );
      return queue.textChannel.send(embed).catch(console.error);
    }

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25,
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send(
          `**<:echo_cross:840852256416595998> ${lan.COPYRIGHT}**`
        );
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);

    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    embed
      .setAuthor(`${lan.STARTED}`, message.client.user.displayAvatarURL())
      .setDescription(`**[${song.title}](${song.url})**`);

    queue.textChannel.send(embed).catch((err) => {
      return;
    });
  },
};
