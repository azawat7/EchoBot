const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(process.env.YOUTUBE_API_KEY);
const { play } = require("../../util/music.js");

module.exports.help = {
  name: "play",
  aliases: ["p"],
  category: "music",
  expectedArgs: "`<query/url>`",
  minArgs: 1,
  maxArgs: null,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
};

module.exports.run = async (client, message, args, language, settings) => {
  let embed = new MessageEmbed().setColor(client.colors.echo);

  const { channel } = message.member.voice;

  if (!channel) {
    embed.setDescription(`${client.emoji.cross} **${language.NOCHANNEL}**`);
    return message.channel.send(embed);
  }

  const targetsong = args.join(" ");
  const videoPattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
  const urlcheck = videoPattern.test(args[0]);

  if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
    embed.setDescription(`${client.emoji.cross} **${language.NOPLAYLIST}**`);
    return message.channel.send(embed);
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  const queueConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: false,
    volume: 100,
    playing: true,
  };

  const voteConstruct = {
    vote: 0,
    voters: [],
  };

  let songData = null;
  let song = null;

  if (urlcheck) {
    try {
      songData = await ytdl.getInfo(args[0]);

      song = {
        title: songData.videoDetails.title,
        url: songData.videoDetails.video_url,
        duration: songData.videoDetails.lengthSeconds,
        thumbnail: songData.videoDetails.thumbnails[3].url,
      };
    } catch (error) {
      if (message.include === "copyright") {
        embed.setDescription(`**${client.emoji.cross} ${language.COPYRIGHT}**`);
        return message.channel.send(embed);
      } else {
        console.error(error);
      }
    }
  } else {
    try {
      const result = await youtube.searchVideos(targetsong, 1);
      songData = await ytdl.getInfo(result[0].url);

      song = {
        title: songData.videoDetails.title,
        url: songData.videoDetails.video_url,
        duration: songData.videoDetails.lengthSeconds,
        thumbnail: songData.videoDetails.thumbnails[3].url,
      };
    } catch (error) {
      console.log(error);
      if (error.errors[0].domain === "usageLimits") {
        embed.setDescription(`${client.emoji.cross} **${language.API}**`);
        return message.channel.send(embed);
      }
    }
  }

  if (serverQueue) {
    if (
      serverQueue.songs.length >
        Math.floor(client.config.musicQueueLimit - 1) &&
      client.config.musicQueueLimit !== 0
    ) {
      let QUEUEERROR = language.QUEUEERROR.replace(
        "{queueLimit}",
        client.config.musicQueueLimit
      );
      embed.setDescription(`${client.emoji.cross} **${QUEUEERROR}**`);
      return message.channel.send(embed);
    }

    serverQueue.songs.push(song);
    embed.setAuthor(`${language.NEWSONG}`, client.user.displayAvatarURL());
    embed.setDescription(`**[${song.title}](${song.url})**`);
    embed
      .setThumbnail(song.thumbnail)
      .setFooter(
        `${language.LIKES} - ` +
          songData.videoDetails.likes +
          `, ${language.DISLIKES} - ` +
          songData.videoDetails.dislikes
      );

    return serverQueue.textChannel.send(embed).catch(console.error);
  } else {
    queueConstruct.songs.push(song);
  }

  if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);
  message.client.vote.set(message.guild.id, voteConstruct);
  if (!serverQueue) {
    try {
      queueConstruct.connection = await channel.join();
      play(queueConstruct.songs[0], message);
    } catch (error) {
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      embed.setDescription(`${client.emoji.cross} **${CHANNELERROR}**`);
      return message.channel.send(embed);
    }
  }
};
