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
  moderator: true,
};

module.exports.run = async (client, message, args, language) => {
  message.delete();
  const amount = args.join(" ");
  console.log(amount);

  if (isNaN(amount))
    return message.channel.sendErrorMessage(language.NANNUMBER);

  if (amount > 100) return message.channel.sendErrorMessage(language.TH);

  if (amount < 2) return message.channel.sendErrorMessage(language.TL);

  await message.channel.messages.fetch({ limit: amount }).then((messages) => {
    message.channel.bulkDelete(messages);
  });

  const embed = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.check} **${replace(language.SUC, {
        "{nmb_of_msg}": amount,
      })}**`
    )
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel
    .send({ embeds: [embed] })
    .then((m) => setTimeout(() => m.delete(), 5000));
};
