const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const d = require("replacer-js");

module.exports.help = {
  name: "level",
  aliases: ["rank", "lvl"],
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
    .setCurrentXP(cleanXp, `#${userInfo.level.color}`)
    .setRequiredXP(cleanNextLevelXp, `#${userInfo.level.color}`)
    .setRank(position)
    .renderEmojis(true)
    .setLevel(userInfo.level.levels)
    .setProgressBar(`#${userInfo.level.color}`, "COLOR")
    .setLevelColor(`#${userInfo.level.color}`, `#${userInfo.level.color}`)
    .setRankColor(`#${userInfo.level.color}`, `#${userInfo.level.color}`)
    .setUsername(message.author.username, `#${userInfo.level.color}`)
    .setDiscriminator(message.author.discriminator, `#${userInfo.level.color}`)
    .setStatus("offline");

  rank.build().then((data) => {
    const attachment = new MessageAttachment(data, `rank.png`);
    message.channel.send({ content: language.RE, files: [attachment] });
  });
};

function xpFor(level) {
  return level * level * 100;
}
