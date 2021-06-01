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
};

module.exports.run = (client, message, args, language, settings) => {
  const core = os.cpus()[0];
  const embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setAuthor(`🔰 | {echo}`)
    .addField(
      `${language.GENERAL}`,
      `\`\`\`autohotkey
Uptime -- ${ms(os.uptime() * 1000, { long: true })}
Library -- Discord.js v${djsversion}
Env -- Node.js ${process.version}
Version -- v${version}\`\`\`` // prettier-ignore
    )
    .addField(
      `${language.STATS}`,
      `\`\`\`autohotkey
OS -- ${process.platform} 
CPU -- ${core.model}
CPU Cores -- ${os.cpus().length}
RAM -- ${client.formatBytes(process.memoryUsage().heapTotal)}
RAM Usage -- ${client.formatBytes(process.memoryUsage().heapUsed)}\`\`\`` // prettier-ignore
    )
    .setTimestamp();

  message.channel.send(embed);
};
