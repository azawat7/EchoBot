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
  example: 2,
};

module.exports.run = async (client, message, args, language, settings) => {
  const embed = new MessageEmbed().setColor(client.colors.echo);

  const state = args[0];
  const id = args[1];

  if (!client.guilds.cache.has(id)) {
    embed.setDescription(
      `**${client.emoji.cross} ${language.NOSERVER} ${id} !**`
    );
    return message.channel.sendErrorMessage(`**${language.NOSERVER} ${id} !**`);
  }

  if (state === "add") {
    BlacklistServer.findOne({ blacklistedServer: id }, async (err, data) => {
      if (data) {
        return message.channel.sendErrorMessage(`**${language.SERVERBL}**`);
      }

      new BlacklistServer({
        blacklistedServer: id,
      }).save();
      message.channel.sendSuccessMessage(`**${language.SUCCESS}**`);
    });
  } else if (state === "remove") {
    BlacklistServer.findOne({ blacklistedServer: id }, async (err, data) => {
      if (!data) {
        return message.channel.sendErrorMessage(`**${language.SERVERBLL}**`);
      }
      data.delete();
      message.channel.sendSuccessMessage(`**${language.SUCCESS1}**`);
    });
  } else {
    return;
  }
};
