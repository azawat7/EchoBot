const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

module.exports.help = {
  name: "clear",
  aliases: ["purge"],
  category: "moderation",
  expectedArgs: "`<number_of_msg>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: ["MANAGE_MESSAGES"],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "✖",
};

module.exports.run = async (client, message, args, language) => {
  const amount = args.join(" ");

  const invAmount = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.NANNUMBER}**`);

  const thAmount = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.TH}**`);

  const tlAmount = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.TL}**`);

  // Condition

  if (isNaN(amount)) return message.channel.send(invAmount);

  if (amount > 100) return message.channel.send(thAmount);

  if (amount < 1) return message.channel.send(tlAmount);

  // Execute le clear
  await message.channel.messages.fetch({ limit: amount }).then((messages) => {
    message.channel.bulkDelete(messages);
  });

  const clearSuc = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.check} **${replace(language.SUC, {
        "{nmb_of_msg}": amount,
      })}**`
    )
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel
    .send({ embeds: [clearSuc] })
    .then((m) => m.delete({ timeout: 4000 }));
};
