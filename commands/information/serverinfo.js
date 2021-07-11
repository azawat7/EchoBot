const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "serverinfo",
  aliases: ["si"],
  category: "information",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "📟",
  enabled: false,
};
//

module.exports.run = async (client, message, args, language) => {
  const owner = message.guild.fetchOwner();
  console.log(owner);
  const filterLevels = {
    DISABLED: language.OFF,
    MEMBERS_WITHOUT_ROLES: language.NOROLE,
    ALL_MEMBERS: language.EVERY,
  };
  const verificationLevels = {
    NONE: language.NONE,
    LOW: language.LOW,
    MEDIUM: language.MEDIUM,
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
  };

  const vanityCode = message.guild.vanityURLCode;
  let vanityInvite = `discord.gg/${vanityCode}`;
  if (vanityCode === null) vanityInvite = language.NOURL;

  let guild = message.guild;
  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + ` ${language.DAYSAGO}`;
  }

  let serverembed = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setFooter(
      `${r(language.REQUESTED, {
        "{user}": message.author.tag,
      })}`
    )
    .setColor(client.colors.echo)
    .addFields(
      {
        name: `🎫 ${language.NAME}`,
        value: `>>> \`${message.guild.name}\``,
        inline: true,
      },
      {
        name: `📅 ${language.CREATIONDATE}`,
        value: `>>> \`${message.channel.guild.createdAt
          .toUTCString()
          .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})\``,
        inline: true,
      },
      {
        name: `👥 ${language.MEMBERS}`,
        value: `>>> \`${message.guild.members.cache.size}\``,
        inline: true,
      },
      {
        name: `💯 ${language.TOTALMEMBERS}`,
        value: `>>> \`${
          message.guild.members.cache.filter((member) => !member.user.bot).size
        } ${language.USER} | ${
          message.guild.members.cache.filter((member) => member.user.bot).size
        } ${language.BOT}\``,
        inline: true,
      },
      {
        name: `🆔 ${language.ID}`,
        value: `>>> \`${message.guild.id}\``,
        inline: true,
      },
      {
        name: `👑 ${language.OWNER}`,
        value: `>>> \`${owner.user.username}#${owner.user.discriminator}\``,
        inline: true,
      },
      {
        name: `✔️ ${language.VERIFLVL}`,
        value: `>>> \`${verificationLevels[message.guild.verificationLevel]}\``,
        inline: true,
      },
      {
        name: `🚀 ${language.BOOST}`,
        value: `>>> \`${
          message.guild.premiemTier
            ? `${language.TIER} ${message.guild.premiumTier}`
            : language.NONE
        }\``,
        inline: true,
      },
      {
        name: `💨 ${language.BOOSTS}`,
        value: `>>> \`${message.guild.premiumSubscriptionCount || "0"}\``,
        inline: true,
      },
      {
        name: `💨 ${language.FILTER}`,
        value: `>>> \`${filterLevels[message.guild.explicitContentFilter]}\``,
        inline: true,
      },
      {
        name: `💨 ${language.VANITY}`,
        value: `>>> \`${vanityInvite}\``,
      }
    )
    .addField(
      `💫 ${language.EMOJIS}`,
      `
        >>> 💬 ${language.TEXT} \`${
        message.guild.channels.cache.filter(
          (channel) => channel.type === "GUILD_TEXT"
        ).size
      }\`\n
        🎤 ${language.VOICE} \`${
        message.guild.channels.cache.filter(
          (channel) => channel.type === "GUILD_VOICE"
        ).size
      }\`\n
        😗 ${language.EMOJI} \`${message.guild.emojis.cache.size}\`
        👻 ${language.ANIME} \`${
        message.guild.emojis.cache.filter((emoji) => emoji.animated).size
      }\`
      `,
      true
    )
    .addField(
      `👨‍🎓 ${language.PRESENCE}`,
      `
        >>> ${client.emoji.online} ${language.ONLINE} \`${
        message.guild.members.cache.filter(
          (member) => member.presence?.status === "online"
        ).size
      }\`
        ${client.emoji.idle} ${language.IDLE} \`${
        message.guild.members.cache.filter(
          (member) => member.presence?.status === "idle"
        ).size
      }\`
        ${client.emoji.dnd} ${language.DND} \`${
        message.guild.members.cache.filter(
          (member) => member.presence?.status === "dnd"
        ).size
      }\`
        ${client.emoji.offline} ${language.OFFLINE} \`${
        message.guild.members.cache.filter(
          (member) => member.presence?.status === "offline"
        ).size
      }\`
      `,
      true
    );

  message.channel.send({ embeds: [serverembed] });
};
