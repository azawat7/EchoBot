const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "module",
  aliases: ["modules"],
  category: "administration",
  expectedArgs: "`[module_name] [on/off/edit] [value]`",
  minArgs: 0,
  maxArgs: 3,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  emoji: "📟",
  admin: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  let moduleName = args[0];
  let secondQuery = args[1];

  if (!args.length) {
    const antialtb = new MessageButton()
      .setCustomId("antialtb")
      .setStyle("SECONDARY")
      .setEmoji("🤖")
      .setLabel("Anti-alt");
    const autoroleb = new MessageButton()
      .setCustomId("autoroleb")
      .setStyle("SECONDARY")
      .setEmoji("🎭")
      .setLabel("Auto-role");
    const levelb = new MessageButton()
      .setCustomId("levelb")
      .setStyle("SECONDARY")
      .setEmoji("📊")
      .setLabel("Level");
    const activeRow = new MessageActionRow().addComponents([
      antialtb,
      autoroleb,
      levelb,
    ]);

    const antialtbDISABLED = new MessageButton()
      .setCustomId("antialtb-disabled")
      .setStyle("SECONDARY")
      .setEmoji("🤖")
      .setLabel("Anti-alt")
      .setDisabled(true);
    const autorolebDISABLED = new MessageButton()
      .setCustomId("autoroleb-disabled")
      .setStyle("SECONDARY")
      .setEmoji("🎭")
      .setLabel("Auto-role")
      .setDisabled(true);
    const levelbDISABLED = new MessageButton()
      .setCustomId("levelb-disabled")
      .setStyle("SECONDARY")
      .setEmoji("📊")
      .setLabel("Level")
      .setDisabled(true);
    const disabledRow = new MessageActionRow().addComponents([
      antialtbDISABLED,
      autorolebDISABLED,
      levelbDISABLED,
    ]);

    const embed = new MessageEmbed()
      .setColor(client.colors.echo)
      .setTitle(
        r(language.moduleEmbed.TITLE, { "{guild}": message.guild.name })
      )
      .setDescription(
        `${r(language.moduleEmbed.DESCRIPTION, {
          "{on}": client.emoji.on,
          "{off}": client.emoji.off,
        })}\n\n${language.moduleEmbed.BUTTONS}`
      );

    const msg = await message.channel.send({
      embeds: [embed],
      components: [activeRow],
    });
    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = await msg.createMessageComponentCollector({
      filter,
      time: 30000,
    });

    collector.on("collect", (i) => {
      const tag = i.customId;
      if (tag === "antialtb") {
        const embed = new MessageEmbed()
          .setColor(client.colors.echo)
          .setTitle(language.helpembed.antialt.TITLE)
          .setDescription(
            `${language.helpembed.antialt.MODULEDESCRIPTION}\n\n${r(
              language.helpembed.antialt.EXAMPLES,
              {
                "{prefix}": settings.prefix,
                "{prefix1}": settings.prefix,
                "{prefix2}": settings.prefix,
              }
            )}`
          );
        i.reply({ embeds: [embed], ephemeral: true });
      }
      if (tag === "autoroleb") {
        const embed = new MessageEmbed()
          .setColor(client.colors.echo)
          .setTitle(language.helpembed.autorole.TITLE)
          .setDescription(
            `${language.helpembed.autorole.MODULEDESCRIPTION}\n\n${r(
              language.helpembed.autorole.EXAMPLES,
              {
                "{prefix}": settings.prefix,
                "{prefix1}": settings.prefix,
                "{prefix2}": settings.prefix,
              }
            )}`
          );
        i.reply({ embeds: [embed], ephemeral: true });
      }
      if (tag === "levelb") {
        const embed = new MessageEmbed()
          .setColor(client.colors.echo)
          .setTitle(language.helpembed.level.TITLE)
          .setDescription(
            `${language.helpembed.level.MODULEDESCRIPTION}\n\n${r(
              language.helpembed.level.EXAMPLES,
              {
                "{prefix}": settings.prefix,
                "{prefix1}": settings.prefix,
              }
            )}`
          );
        i.reply({ embeds: [embed], ephemeral: true });
      }
    });
    collector.on("end", (collected) => {
      if (!message.deleted && message.deletable) {
        msg.edit({ components: [disabledRow] });
      }
    });
    return;
  }
  if (moduleName) {
    let modules = ["level", "auto-role", "anti-alt"];
    if (!modules.includes(moduleName.toLowerCase())) {
      return message.channel.sendErrorMessage(
        `${r(language.firstArg.ERR, {
          "{modules}": modules.map((module) => `\`${module}\``).join(", "),
        })}`
      );
    }
    /////////////////////////////
    // Level
    /////////////////////////////
    if (moduleName.toLowerCase() === "level") {
      if (!secondQuery) {
        message.channel.sendErrorMessage(language.level.NOS);
      }
      if (secondQuery.toLowerCase() === "on") {
        if (settings.level.enabled === true) {
          return message.channel.sendErrorMessage(
            `${language.level.ALENABLED}`
          );
        }

        await client.updateGuild(message.guild, {
          level: { enabled: true },
        });
        return message.channel.sendSuccessMessage(`${language.level.ENABLED}`);
      } else if (secondQuery.toLowerCase() === "off") {
        if (settings.level.enabled === false) {
          return message.channel.sendErrorMessage(
            `${language.level.ALDISABLED}`
          );
        }
        await client.updateGuild(message.guild, {
          level: { enabled: false },
        });
        return message.channel.sendSuccessMessage(`${language.level.DISABLED}`);
      } else {
        return message.channel.sendErrorMessage(
          `${language.level.INVALIDARGS}`
        );
      }
    }
    /////////////////////////////
    // Anti-alt
    /////////////////////////////
    if (moduleName.toLowerCase() === "anti-alt") {
      if (!secondQuery) {
        return message.channel.sendErrorMessage(language.antialt.NOS);
      }
      if (secondQuery.toLowerCase() === "on") {
        if (settings.antiAlt.enabled === true) {
          return message.channel.sendErrorMessage(
            `${language.antialt.ALENABLED}`
          );
        }

        await client.updateGuild(message.guild, {
          antiAlt: { enabled: true },
        });
        return message.channel.sendSuccessMessage(
          `${language.antialt.ENABLED}`
        );
      } else if (secondQuery.toLowerCase() === "off") {
        if (settings.antiAlt.enabled === false) {
          return message.channel.sendErrorMessage(
            `${language.antialt.ALDISABLED}`
          );
        }
        await client.updateGuild(message.guild, {
          antiAlt: { enabled: false },
        });
        return message.channel.sendSuccessMessage(
          `${language.antialt.DISABLED}`
        );
      } else if (secondQuery.toLowerCase() === "edit") {
        const time = args[2];

        if (settings.antiAlt.enabled === false) {
          return message.channel.sendErrorMessage(
            r(language.antialt.ALROLE, {
              "{name}": `\`${settings.prefix}module\` \`anti-alt\` \`on\``,
            })
          );
        }

        if (!time) {
          return message.channel.sendErrorMessage(`${language.antialt.ROLE}`);
        }

        if (isNaN(parseInt(time))) {
          return message.channel.sendErrorMessage(language.antialt.NOTTIME);
        }

        if (settings.antiAlt.time === time) {
          return message.channel.sendErrorMessage(language.antialt.ROLEROLE);
        }

        await client.updateGuild(message.guild, {
          antiAlt: { enabled: true, time: time },
        });
        return message.channel.sendSuccessMessage(
          `${r(language.antialt.EDITED, { "{day}": time.toString() })}`
        );
      } else {
        return message.channel.sendErrorMessage(
          `${language.level.INVALIDARGS}`
        );
      }
    }

    if (moduleName.toLowerCase() === "auto-role") {
      if (!secondQuery) {
        return message.channel.sendErrorMessage(language.autorole.NOS);
      }
      if (secondQuery.toLowerCase() === "on") {
        if (settings.antiAlt.enabled === true) {
          return message.channel.sendErrorMessage(
            `${language.autorole.ALENABLED}`
          );
        }

        await client.updateGuild(message.guild, {
          autoRole: { enabled: true },
        });
        return message.channel.sendSuccessMessage(
          `${language.autorole.ENABLED}`
        );
      } else if (secondQuery.toLowerCase() === "off") {
        if (settings.antiAlt.enabled === false) {
          return message.channel.sendErrorMessage(
            `${language.autorole.ALDISABLED}`
          );
        }
        await client.updateGuild(message.guild, {
          autoRole: { enabled: false },
        });
        return message.channel.sendSuccessMessage(
          `${language.autorole.DISABLED}`
        );
      } else if (secondQuery.toLowerCase() === "edit") {
        const role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[2]);

        if (settings.antiAlt.enabled === false) {
          return message.channel.sendErrorMessage(
            r(language.autorole.ALROLE, {
              "{name}": `\`${settings.prefix}module\` \`auto-role\` \`on\``,
            })
          );
        }

        if (!role) {
          return message.channel.sendErrorMessage(`${language.autorole.ROLE}`);
        }

        if (settings.antiAlt.role === role) {
          return message.channel.sendErrorMessage(language.autorole.ROLEROLE);
        }

        await client.updateGuild(message.guild, {
          autoRole: { enabled: true, role: role },
        });
        return message.channel.sendSuccessMessage(
          `${r(language.autorole.EDITED, { "{role}": role })}`
        );
      } else {
        return message.channel.sendErrorMessage(
          `${language.level.INVALIDARGS}`
        );
      }
    }
  }
};
