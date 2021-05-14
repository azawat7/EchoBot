const { MessageAttachment, MessageEmbed } = require("discord.js")

module.exports.help = {
	name: "emojis",
	aliases: ["emojilist", "serveremojis"],
	category: "fun",
	description: "Shows all the emojis available in the server.",
	expectedArgs: null,
	minArgs: 0,
	maxArgs: 0,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}

module.exports.run = async (client, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name} | Emojis [${OverallEmojis}] `)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
      )
      .setColor('#f50041');

    if (Embed.length > 2000) {
      return message.channel.send(
        `I'm sorry but, my limit is 2000 characters only!`
      );
    } else {
      message.channel.send(Embed);
    }
}