const { MessageEmbed } = require("discord.js");
const { BlacklistServer } = require("../../models/index");

module.exports.help = {
  name: "blacklistserver",
  aliases: ["blserv"],
  category: "owner",
  expectedArgs: "`<add/remove>` `<server_id>`",
  minArgs: 2,
  maxArgs: 2,
  ownerOnly: true,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
};

module.exports.run = async (client, message, args, language, settings) => {
  const embed = new MessageEmbed().setColor(client.colors.echo);

  const state = args[0];
  const id = args[1];

  if (!client.guilds.cache.has(id)) {
    embed.setDescription(
      `**${client.emoji.cross} ${language.NOSERVER} ${id} !**`
    );
    return message.channel.send(embed);
  }

  if (state === "add") {
    BlacklistServer.findOne({ blacklistedServer: id }, async (err, data) => {
      if (data) {
        embed.setDescription(`**${client.emoji.cross} ${language.SERVERBL}**`);
        return message.channel.send(embed);
      }

      new BlacklistServer({
        blacklistedServer: id,
      }).save();
      embed.setDescription(`**${client.emoji.check} ${language.SUCCESS}**`);
      message.channel.send(embed);
    });
  } else if (state === "remove") {
    BlacklistServer.findOne({ blacklistedServer: id }, async (err, data) => {
      if (!data) {
        embed.setDescription(`**${client.emoji.cross} ${language.SERVERBLL}**`);
        return message.channel.send(embed);
      }
      data.delete();
      embed.setDescription(`**${client.emoji.check} ${language.SUCCESS1}**`);
      message.channel.send(embed);
    });
  } else {
    return;
  }
};
