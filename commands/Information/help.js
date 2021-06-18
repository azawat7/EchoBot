const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const replace = require("replacer-js");
const { MessageActionRow, MessageButton } = require("discord-buttons");
module.exports.help = {
  name: "help",
  aliases: [],
  category: "information",
  expectedArgs: "`[command_name]`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
};

module.exports.run = async (client, message, args, language, settings) => {
  if (!args[0]) {
    const bbadmin = new MessageButton()
      .setStyle("grey")
      .setID("bbadmin")
      .setEmoji("843869235432128533");
    const bbmoderation = new MessageButton()
      .setStyle("grey")
      .setID("bbmoderation")
      .setEmoji("843869235180601344");
    const bbutility = new MessageButton()
      .setStyle("grey")
      .setID("bbutility")
      .setEmoji("843869235322814464");
    const bbfun = new MessageButton()
      .setStyle("grey")
      .setID("bbfun")
      .setEmoji("843869235700957196");
    const bbinformation = new MessageButton()
      .setStyle("grey")
      .setID("bbinformation")
      .setEmoji("843869235469484072");
    const bbimage = new MessageButton()
      .setStyle("grey")
      .setID("bbimage")
      .setEmoji("851918269593813014");

    const bbback = new MessageButton()
      .setStyle("grey")
      .setID("bbback")
      .setEmoji("↩");

    const firstButtonsRow = new MessageActionRow().addComponents([
      bbadmin,
      bbmoderation,
      bbutility,
      bbfun,
      bbinformation,
    ]);
    const secondButtonsRow = new MessageActionRow().addComponents([
      bbimage,
      bbback,
    ]);
    const secondButtonsRowWithoutBack = new MessageActionRow().addComponents([
      bbimage,
    ]);

    const b_page_enabled = new MessageButton()
      .setStyle("red")
      .setID("baseb_pages")
      .setLabel(" ");
    const b_buttons_enabled = new MessageButton()
      .setStyle("green")
      .setID("baseb_buttons")
      .setLabel(" ");
    const b_dm_enabled = new MessageButton()
      .setStyle("blurple")
      .setID("baseb_dm")
      .setLabel(" ");

    const base_embed = new MessageEmbed()
      .setColor(client.colors.echo)
      .setDescription(`**${language.BASE}**`);

    const base_buttons_enabled = new MessageActionRow().addComponents([
      b_page_enabled,
      b_buttons_enabled,
      b_dm_enabled,
    ]);

    message.channel.send({
      embed: base_embed,
      component: base_buttons_enabled,
    });

    client.on("clickButton", async (button) => {
      await button.defer();
      if (button.clicker.user.id == !message.author.id) return;
      if (button.id === "baseb_pages") {
        let categories = [];

        const dirEmojis = {
          admin: `${client.emoji.administration} ${language.ADMIN}`,
          moderation: `${client.emoji.moderation} ${language.MODERATION}`,
          fun: `${client.emoji.fun} ${language.FUN}`,
          information: `${client.emoji.information} ${language.INFO}`,
          utility: `${client.emoji.utility} ${language.UTILITY}`,
          nsfw: `${client.emoji.nsfw} ${language.NSFW}`,
          image: `${client.emoji.image} ${language.IMAGE}`,
        };

        const ignoredCategories = ["owner"];

        readdirSync("./commands/").forEach((dir) => {
          if (ignoredCategories.includes(dir)) return;
          const editedName = `${dirEmojis[dir]}`;
          const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );

          const cmds = commands
            .filter((command) => {
              let file = require(`../../commands/${dir}/${command}`);

              return !file.help.hidden;
            })
            .map((command) => {
              let file = require(`../../commands/${dir}/${command}`);

              if (!file.help.name) return "No command name.";

              let name = file.help.name.replace(".js", "");

              return `\`${name}\`\, `;
            });

          let data = new Object();

          data = {
            name: editedName,
            value: cmds.length === 0 ? "In progress." : cmds.join(" "),
          };

          categories.push(data);
        });

        let embed = new MessageEmbed()
          .setAuthor(`${language.TITLE1}`, `https://i.imgur.com/45UIEsS.png`)
          .setColor(client.colors.echo)
          .setDescription(
            `>>> ${replace(language.EDES1, {
              "{prefix}": settings.prefix,
            })}`
          )
          .addFields(categories)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        return button.message.edit({ embed: embed });
      }
      if (button.id === "baseb_buttons") {
        let embed = new MessageEmbed()
          .setColor(client.colors.echo)
          .setTitle(language.BT)
          .setDescription(`>>> ${client.emoji.administration} \`${language.ADMIN}\`
              ${client.emoji.moderation} \`${language.MODERATION}\`
              ${client.emoji.utility} \`${language.UTILITY}\`
              ${client.emoji.fun} \`${language.FUN}\`
              ${client.emoji.information} \`${language.INFO}\`
              ${client.emoji.image} \`${language.IMAGE}\``);
        button.message.edit({
          embed: embed,
          components: [firstButtonsRow, secondButtonsRowWithoutBack],
        });
      }
      if (button.id === "baseb_dm") {
        const embedss = new MessageEmbed()
          .setColor(client.colors.echo)
          .setDescription(`📨 **${language.DMS}**`);
        button.message.edit({ embed: embedss });
        ///
        let categories = [];

        const dirEmojis = {
          admin: `${client.emoji.administration} ${language.ADMIN}`,
          moderation: `${client.emoji.moderation} ${language.MODERATION}`,
          fun: `${client.emoji.fun} ${language.FUN}`,
          information: `${client.emoji.information} ${language.INFO}`,
          utility: `${client.emoji.utility} ${language.UTILITY}`,
          nsfw: `${client.emoji.nsfw} ${language.NSFW}`,
          image: `${client.emoji.image} ${language.IMAGE}`,
        };

        const ignoredCategories = ["owner"];

        readdirSync("./commands/").forEach((dir) => {
          if (ignoredCategories.includes(dir)) return;
          const editedName = `${dirEmojis[dir]}`;
          const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );

          const cmds = commands
            .filter((command) => {
              let file = require(`../../commands/${dir}/${command}`);

              return !file.help.hidden;
            })
            .map((command) => {
              let file = require(`../../commands/${dir}/${command}`);

              if (!file.help.name) return "No command name.";

              let name = file.help.name.replace(".js", "");

              return `\`${name}\`\, `;
            });

          let data = new Object();

          data = {
            name: editedName,
            value: cmds.length === 0 ? "In progress." : cmds.join(" "),
          };

          categories.push(data);
        });

        let embed = new MessageEmbed()
          .setAuthor(`${language.TITLE1}`, `https://i.imgur.com/45UIEsS.png`)
          .setColor(client.colors.echo)
          .setDescription(`>>> ${language.DMDES}`)
          .addFields(categories)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        return message.author.send(embed);
      }
      // Buttons Categories
      if (button.id === "bbadmin") {
        // await button.defer;
        const cmds = client.commands
          .filter((cmd) => cmd.help.category.toLowerCase() === "admin")
          .map(
            (cmd) =>
              `\`${cmd.help.name} ${" ".repeat(
                13 - Number(cmd.help.name.length)
              )} :\` ${jsondes(
                settings.language,
                cmd.help.category,
                cmd.help.name
              )}`
          );

        let adminembed = new MessageEmbed()
          .setColor(`#f50041`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`${client.emoji.administration}  |  ${language.ADMIN}`)
          .setDescription(`● ${cmds.join("\n● ")}`)
          .setTimestamp();

        button.message.edit({
          embed: adminembed,
          components: [firstButtonsRow, secondButtonsRow],
        });
      }
      if (button.id === "bbmoderation") {
        const cmds = client.commands
          .filter((cmd) => cmd.help.category.toLowerCase() === "moderation")
          .map(
            (cmd) =>
              `\`${cmd.help.name} ${" ".repeat(
                14 - Number(cmd.help.name.length)
              )} :\` ${jsondes(
                settings.language,
                cmd.help.category,
                cmd.help.name
              )}`
          );

        let modembed = new MessageEmbed()
          .setColor(`#f50041`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`${client.emoji.moderation}  |  ${language.MODERATION}`)
          .setDescription(`● ${cmds.join("\n● ")}`)
          .setTimestamp();

        button.message.edit({
          embed: modembed,
          components: [firstButtonsRow, secondButtonsRow],
        });
      }
      if (button.id === "bbutility") {
        const cmds = client.commands
          .filter((cmd) => cmd.help.category.toLowerCase() === "utility")
          .map(
            (cmd) =>
              `\`${cmd.help.name} ${" ".repeat(
                11 - Number(cmd.help.name.length)
              )} :\` ${jsondes(
                settings.language,
                cmd.help.category,
                cmd.help.name
              )}`
          );

        let utilityembed = new MessageEmbed()
          .setColor(`#f50041`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`${client.emoji.utility}  |  ${language.UTILITY}`)
          .setDescription(`● ${cmds.join("\n● ")}`)
          .setTimestamp();

        button.message.edit({
          embed: utilityembed,
          components: [firstButtonsRow, secondButtonsRow],
        });
      }
      if (button.id === "bbfun") {
        const cmds = client.commands
          .filter((cmd) => cmd.help.category.toLowerCase() === "fun")
          .map(
            (cmd) =>
              `\`${cmd.help.name} ${" ".repeat(
                11 - Number(cmd.help.name.length)
              )} :\` ${jsondes(
                settings.language,
                cmd.help.category,
                cmd.help.name
              )}`
          );

        let funembed = new MessageEmbed()
          .setColor(`#f50041`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`${client.emoji.fun}  |  ${language.FUN}`)
          .setDescription(`● ${cmds.join("\n● ")}`)
          .setTimestamp();

        button.message.edit({
          embed: funembed,
          components: [firstButtonsRow, secondButtonsRow],
        });
      }
      if (button.id === "bbinformation") {
        const cmds = client.commands
          .filter((cmd) => cmd.help.category.toLowerCase() === "information")
          .map(
            (cmd) =>
              `\`${cmd.help.name} ${" ".repeat(
                13 - Number(cmd.help.name.length)
              )} :\` ${jsondes(
                settings.language,
                cmd.help.category,
                cmd.help.name
              )}`
          );

        let infoembed = new MessageEmbed()
          .setColor(`#f50041`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`${client.emoji.administration}  | ${language.INFO}`)
          .setDescription(`● ${cmds.join("\n● ")}`)
          .setTimestamp();

        button.message.edit({
          embed: infoembed,
          components: [firstButtonsRow, secondButtonsRow],
        });
      }
      if (button.id === "bbimage") {
        const cmds = client.commands
          .filter((cmd) => cmd.help.category.toLowerCase() === "image")
          .map(
            (cmd) =>
              `\`${cmd.help.name} ${" ".repeat(
                5 - Number(cmd.help.name.length)
              )} :\` ${jsondes(
                settings.language,
                cmd.help.category,
                cmd.help.name
              )}`
          );

        let imgembed = new MessageEmbed()
          .setColor(`#f50041`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`${client.emoji.image}  | ${language.IMAGE}`)
          .setDescription(`● ${cmds.join(`\n● `)}`)
          .setTimestamp();

        button.message.edit({
          embed: imgembed,
          components: [firstButtonsRow, secondButtonsRow],
        });
      }
      // Back Button
      if (button.id === "bbback") {
        let backembed = new MessageEmbed()
          .setColor(client.colors.echo)
          .setTitle(language.BT)
          .setDescription(`>>> ${client.emoji.administration} \`${language.ADMIN}\`
              ${client.emoji.moderation} \`${language.MODERATION}\`
              ${client.emoji.utility} \`${language.UTILITY}\`
              ${client.emoji.fun} \`${language.FUN}\`
              ${client.emoji.information} \`${language.INFO}\`
              ${client.emoji.image} \`${language.IMAGE}\``);
        button.message.edit({
          embed: backembed,
          components: [firstButtonsRow, secondButtonsRowWithoutBack],
        });
      }
    });
  } else if (args[0]) {
    const command =
      client.commands.get(args[0]) ||
      client.commands.find(
        (command) =>
          command.help.aliases && command.help.aliases.includes(args[0])
      );

    const errembed = new MessageEmbed()
      .setColor(`#f50041`)
      .setDescription(`${client.emoji.cross} **${language.ERROR}**`);

    if (!command) return message.channel.send(errembed);

    const lang = require(`../../languages/${settings.language}/${command.help.category}/${command.help.name}`);

    const embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setAuthor(
        `${replace(language.TITLE2, {
          "{cmd}": command.help.name,
        })}`
      )
      .addField(
        `📃 ${language.DES}`,
        lang.DESCRIPTION ? `\`${lang.DESCRIPTION}\`` : `\`${language.NODES}\``
      )
      .addField(
        `⏱ ${language.COOLDOWN}`,
        `\`${command.help.cooldown} ${language.SECOND}\``,
        true
      )
      .addField(
        `🧿 ${language.USAGE}`,
        command.help.expectedArgs
          ? `\`${settings.prefix}${command.help.name}\` ${command.help.expectedArgs}`
          : `\`${settings.prefix}${command.help.name}\``,
        true
      )
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());

    if (command.help.aliases.length > 0)
      embed.addField(
        `🔖 ${language.ALIA}`,
        `\`${command.help.aliases.join("`, `")}\``
      );
    if (command.help.nsfw)
      embed.addField(`🔞 ${language.NSFW}`, `\`${language.NSFW1}\``);
    if (command.help.ownerOnly)
      embed.addField(`❌ ${language.OWNERONLY}`, `\`${language.OWNERONLY1}\``);
    if (command.help.example === 1) {
      const example1 = replace(lang.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      embed.addField(`🔮 ${language.EXAMP}`, `● ${example1}`);
    }
    if (command.help.example === 2) {
      const example1 = replace(lang.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example2 = replace(lang.EXAMPLE2, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      embed.addField(`🔮 ${language.EXAMPD}`, `● ${example1}\n● ${example2}`);
    }
    if (command.help.example === 3) {
      const example1 = replace(lang.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example2 = replace(lang.EXAMPLE2, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example3 = replace(lang.EXAMPLE3, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      embed.addField(
        `🔮 ${language.EXAMPD}`,
        `● ${example1}\n● ${example2}\n● ${example3}`
      );
    }
    if (command.help.example === 4) {
      const example1 = replace(lang.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example2 = replace(lang.EXAMPLE2, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example3 = replace(lang.EXAMPLE3, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example4 = replace(lang.EXAMPLE4, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      embed.addField(
        `🔮 ${language.EXAMPD}`,
        `● ${example1}\n● ${example2}\n● ${example3}\n● ${example4}`
      );
    }

    return message.channel.send(embed);
  }
};

function jsondes(lan, cat, name) {
  const file = require(`../../languages/${lan}/${cat}/${name}`);
  const des = file.DESCRIPTION;

  return des;
}
