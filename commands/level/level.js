const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const d = require("replacer-js");

module.exports.help = {
  name: "level",
  aliases: ["rank"],
  category: "level",
  expectedArgs: "`[@user]`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "📈",
};

module.exports.run = async (
  client,
  message,
  args,
  language,
  settings,
  userInfo
) => {
  const cleanXp = userInfo.level.experience - xpFor(userInfo.level.levels);
  const cleanNextLevelXp =
    xpFor(userInfo.level.levels + 1) - xpFor(userInfo.level.levels);

  const position = await client.getUserPosition(message.author, settings);

  const rank = new canvacord.Rank()
    .setAvatar(
      message.author.displayAvatarURL({ format: "png", dynamic: true })
    )
    .setCurrentXP(cleanXp)
    .setRequiredXP(cleanNextLevelXp)
    .setRank(position)
    .setLevel(userInfo.level.levels)
    .setProgressBar(`#${userInfo.level.color}`, "COLOR")
    .setUsername(message.author.username)
    .setDiscriminator(message.author.discriminator);

  rank.build().then((data) => {
    const attachment = new MessageAttachment(data, `rank.png`);
    message.channel.send({ content: language.RE, files: [attachment] });
  });
};

function xpFor(level) {
  return level * level * 100;
}
