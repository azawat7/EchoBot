const { MessageEmbed, version: djsversion, Message } = require("discord.js");
const { version } = require("../../package.json");
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");

module.exports.help = {
  name: "botinfo",
  aliases: ["boti", "bi"],
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
  emoji: "🤖",
};

module.exports.run = (client, message, args, language, settings) => {
  const core = os.cpus()[0];
  const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setAuthor(`🔰 | {echo}`)
    .addField(
      `\:trident: - ${language.GENERAL}`,
      `\`\`\`autohotkey
${language.UPTIME} -- ${ms(os.uptime() * 1000, { long: true })}
${language.LIBRARY} -- Discord.js v${djsversion}
${language.ENV} -- Node.js ${process.version}
${language.VERSION} -- v${version}\`\`\`` // prettier-ignore
    )
    .addField(
      `\:robot: - ${language.BOT}`,
      `\`\`\`autohotkey
${language.GUILDS} -- ${client.guilds.cache.size}
${language.USERS} -- ${client.users.cache.size}
${language.CHANNELS} -- ${client.channels.cache.size}
${language.COMMANDS} -- ${client.commands.size}\`\`\`` // prettier-ignore
    )
    .addField(
      `\:books: - ${language.STATS}`,
      `\`\`\`autohotkey
${language.OS} -- ${os.type()} ${os.release()}
CPU -- ${core.model}
${language.CPUCORES} -- ${os.cpus().length}
RAM -- ${client.formatBytes(process.memoryUsage().heapTotal)}
${language.RAMUSAGE} -- ${client.formatBytes(process.memoryUsage().heapUsed)}\`\`\`` // prettier-ignore
    )
    .setTimestamp();

  message.channel.send({ embed });
};
