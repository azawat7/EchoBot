/* 
This command doesn't work for the moment
*/

const { MessageEmbed } = require("discord.js");
const { Guild } = require("../../models/index");
const day = require("dayjs");

module.exports.help = {
  name: "setpremium",
  aliases: ["setprem", "opr"],
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

  // const st = args[0];
  // const state = args[1];

  // if (st === "add") {
  //   if (state === "perm") {
  //     if (
  //       Guild.findOne(
  //         { guildID: message.guild.id },
  //         { premium: { isPremium: true } }
  //       )
  //     ) {
  //       embed.setDescription(`${client.emoji.cross} **${language.ERROR}**`);
  //       return message.channel.send(embed);
  //     } else {
  //       Guild.findOneAndUpdate(
  //         { guildID: message.guild.id },
  //         { premium: { isPremium: true } }
  //       );
  //     }
  //   }
  //   await client.updateGuild(message.guild, { isPremium: true });
  //   embed.setDescription(`${client.emoji.check} **${language.SUCCESS}**`);
  //   return message.channel.send(embed);
  // } else if (st === "remove") {
  //   if (
  //     Guild.find(
  //       { guildID: message.guild.id },
  //       { premium: { isPremium: false } }
  //     )
  //   ) {
  //     embed.setDescription(`${client.emoji.cross} **${language.ERROR1}**`);
  //     return message.channel.send(embed);
  //   }
  //   Guild.findOneAndUpdate(
  //     { guildID: message.guild.id },
  //     { premium: { isPremium: false, permanent: false } }
  //   );
  //   await client.updateGuild(message.guild, { isPremium: false });
  //   embed.setDescription(`${client.emoji.check} **${language.SUCCESS1}**`);
  //   return message.channel.send(embed);
  // } else {
  //   return;
  // }
};
