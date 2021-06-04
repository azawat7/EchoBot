const { MessageEmbed } = require("discord.js");
const { Guild } = require("../../models/index");

module.exports.help = {
  name: "setpremium",
  aliases: ["setprem", "opr"],
  category: "owner",
  expectedArgs: "`<add/remove>` `<server_id>`",
  minArgs: 1,
  maxArgs: 1,
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

  if (state === "add") {
    if (settings.isPremium === true) {
      embed.setDescription(`${client.emoji.cross} **${language.ERROR}**`);
      return message.channel.send(embed);
    }
    await client.updateGuild(message.guild, { isPremium: true });
    embed.setDescription(`${client.emoji.check} **${language.SUCCESS}**`);
    return message.channel.send(embed);
  } else if (state === "remove") {
    if (settings.isPremium === false) {
      embed.setDescription(`${client.emoji.cross} **${language.ERROR1}**`);
      return message.channel.send(embed);
    }
    await client.updateGuild(message.guild, { isPremium: false });
    embed.setDescription(`${client.emoji.check} **${language.SUCCESS1}**`);
    return message.channel.send(embed);
  } else {
    return;
  }
};
