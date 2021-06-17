const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const replace = require("replacer-js");
const { MessageActionRow, MessageButton } = require("discord-buttons");
const e = require("express");

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

  ///////

  const b_page_disabled = new MessageButton()
    .setStyle("red")
    .setID("baseb_pages_d")
    .setLabel(" ")
    .setDisabled(true);
  const b_buttons_disabled = new MessageButton()
    .setStyle("green")
    .setID("baseb_buttons_d")
    .setLabel(" ")
    .setDisabled(true);
  const b_dm_disabled = new MessageButton()
    .setStyle("blurple")
    .setID("baseb_dm_d")
    .setLabel(" ")
    .setDisabled(true);

  const base_embed = new MessageEmbed()
    .setColor(client.colors.echo)
    .setDescription(`**${language.BASE}**`);

  const base_buttons_enabled = new MessageActionRow().addComponents([
    b_page_enabled,
    b_buttons_enabled,
    b_dm_enabled,
  ]);
  const base_buttons_disabled = new MessageActionRow().addComponents([
    b_page_disabled,
    b_buttons_disabled,
    b_dm_disabled,
  ]);

  message.channel
    .send({
      embed: base_embed,
      component: base_buttons_enabled,
    })
    .then((msg) => {
      const collector = msg.createButtonCollector(
        (button) => message.author.id === message.author.id,
        { time: 60000 }
      );

      collector.on("collect", (button) => {
        button.defer();

        if (button.clicker.user.id == message.author.id) {
          if (button.id == "baseb_pages") {
            collector.stop();
            button.message.delete();
            let categories = [];

            const dirEmojis = {
              admin: client.emoji.administration,
              moderation: client.emoji.moderation,
              fun: client.emoji.fun,
              information: client.emoji.information,
              utility: client.emoji.utility,
              nsfw: client.emoji.nsfw,
              image: client.emoji.image,
            };

            const ignoredCategories = ["owner"];

            readdirSync("./commands/").forEach((dir) => {
              if (ignoredCategories.includes(dir)) return;
              const editedName = `${dirEmojis[dir]} ${client.capitalize(dir)}`;
              const commands = readdirSync(`./commands/${dir}/`).filter(
                (file) => file.endsWith(".js")
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
              .setAuthor(
                `${language.TITLE1} (1/2)`,
                `https://i.imgur.com/45UIEsS.png`
              )
              .setColor(client.colors.echo)
              .setDescription(
                `>>> ${replace(language.EDES1, {
                  "{prefix}": settings.prefix,
                })}`
              )
              .addFields(categories)
              .setTimestamp()
              .setFooter(message.author.username, message.author.avatarURL());

            //////////
            let secondembed = new MessageEmbed()
              .setAuthor(
                `${language.EDES2} (2/2)`,
                `https://i.imgur.com/45UIEsS.png`
              )
              .setColor(`#f50041`)
              .setDescription(
                `${replace(language.PAGE2, {
                  "{prefix}": settings.prefix,
                  "{prefix1}": settings.prefix,
                })}`
              )
              .setImage(
                `https://cdn.discordapp.com/attachments/838062587051507795/848309507007971348/unknown.png`
              )
              .setTimestamp()
              .setFooter(message.author.username, message.author.avatarURL());

            const pages = [embed, secondembed];
            const emojis = ["◀️", "▶️", "❌"];

            return message.channel.createSlider(
              message.author.id,
              pages,
              emojis,
              60000
            );

            // return message.channel.send(embed);
          } else if (button.id == "baseb_dm") {
            collector.stop();
            const embedss = new MessageEmbed()
              .setColor(client.colors.echo)
              .setDescription(`📨 **${language.DMS}**`);
            msg.edit({ embed: embedss });
            ///
            let categories = [];

            const dirEmojis = {
              admin: client.emoji.administration,
              moderation: client.emoji.moderation,
              fun: client.emoji.fun,
              information: client.emoji.information,
              utility: client.emoji.utility,
              nsfw: client.emoji.nsfw,
              image: client.emoji.image,
            };

            const ignoredCategories = ["owner"];

            readdirSync("./commands/").forEach((dir) => {
              if (ignoredCategories.includes(dir)) return;
              const editedName = `${dirEmojis[dir]} ${client.capitalize(dir)}`;
              const commands = readdirSync(`./commands/${dir}/`).filter(
                (file) => file.endsWith(".js")
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
              .setAuthor(
                `${language.TITLE1}`,
                `https://i.imgur.com/45UIEsS.png`
              )
              .setColor(client.colors.echo)
              .setDescription(`>>> ${language.DMDES}`)
              .addFields(categories)
              .setTimestamp()
              .setFooter(message.author.username, message.author.avatarURL());

            message.author.send(embed);
          } else if (button.id == "baseb_buttons") {
            collector.stop();
            ////////
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

            const firstButtonsRow = new MessageActionRow().addComponents([
              bbadmin,
              bbmoderation,
              bbutility,
              bbfun,
              bbinformation,
            ]);
            const secondButtonsRow = new MessageActionRow().addComponents([
              bbimage,
            ]);
            ////////
            ////////
            let embed = new MessageEmbed()
              .setColor(client.colors.echo)
              .setTitle(language.BT)
              .setDescription(`>>> ${client.emoji.administration} \`${language.ADMIN}\`
              ${client.emoji.moderation} \`${language.MODERATION}\`
              ${client.emoji.utility} \`${language.UTILITY}\`
              ${client.emoji.fun} \`${language.FUN}\`
              ${client.emoji.information} \`${language.INFO}\`
              ${client.emoji.image} \`${language.IMAGE}\``);
            msg.edit({
              embed: embed,
              components: [firstButtonsRow, secondButtonsRow],
            });
          }
        }
      });
      collector.on("end", (collected) => {
        console.log("end");
      });
    });

  // if (
  //   (args && args.join(" ").toLowerCase() == "admin") ||
  //   (args && args[0].toLowerCase() == "admin")
  // ) {
  //   const cmds = client.commands
  //     .filter((cmd) => cmd.help.category.toLowerCase() === "admin")
  //     .map(
  //       (cmd) =>
  //         `\`${cmd.help.name} ${" ".repeat(
  //           13 - Number(cmd.help.name.length)
  //         )} :\``
  //     );

  //   let embed = new MessageEmbed()
  //     .setColor(`#f50041`)
  //     .setFooter(message.author.username, message.author.avatarURL())
  //     .setTitle(`${client.emoji.administration}  | Admin`)
  //     .setDescription(`● ${cmds.join("\n● ")}`)
  //     .setTimestamp();

  //   message.channel.send(embed);
  // } else if (
  //   (args && args.join(" ").toLowerCase() == "fun") ||
  //   (args && args[0].toLowerCase() == "fun")
  // ) {
  //   const cmds = client.commands
  //     .filter((cmd) => cmd.help.category.toLowerCase() === "fun")
  //     .map(
  //       (cmd) =>
  //         `\`${cmd.help.name} ${" ".repeat(
  //           11 - Number(cmd.help.name.length)
  //         )} :\``
  //     );

  //   let embed = new MessageEmbed()
  //     .setColor(`#f50041`)
  //     .setFooter(message.author.username, message.author.avatarURL())
  //     .setTitle(`${client.emoji.fun}  |  Fun`)
  //     .setDescription(`● ${cmds.join("\n● ")}`)
  //     .setTimestamp();

  //   message.channel.send(embed);
  // } else if (
  //   (args && args.join(" ").toLowerCase() == "moderation") ||
  //   (args && args[0].toLowerCase() == "moderation")
  // ) {
  //   const cmds = client.commands
  //     .filter((cmd) => cmd.help.category.toLowerCase() === "moderation")
  //     .map(
  //       (cmd) =>
  //         `\`${cmd.help.name} ${" ".repeat(
  //           14 - Number(cmd.help.name.length)
  //         )} :\``
  //     );

  //   let embed = new MessageEmbed()
  //     .setColor(`#f50041`)
  //     .setFooter(message.author.username, message.author.avatarURL())
  //     .setTitle(`${client.emoji.moderation}  |  Moderation`)
  //     .setDescription(`● ${cmds.join("\n● ")}`)
  //     .setTimestamp();

  //   message.channel.send(embed);
  // } else if (
  //   (args && args.join(" ").toLowerCase() == "nsfw") ||
  //   (args && args[0].toLowerCase() == "nsfw")
  // ) {
  //   const cmds = client.commands
  //     .filter((cmd) => cmd.help.category.toLowerCase() === "nsfw")
  //     .map(
  //       (cmd) =>
  //         `\`${cmd.help.name} ${" ".repeat(
  //           8 - Number(cmd.help.name.length)
  //         )} :\``
  //     );

  //   let embed = new MessageEmbed()
  //     .setColor(`#f50041`)
  //     .setFooter(message.author.username, message.author.avatarURL())
  //     .setTitle(`${client.emoji.nsfw}  |  nsfw`)
  //     .setDescription(`● ${cmds.join("\n● ")}`)
  //     .setTimestamp();

  //   message.channel.send(embed);
  // } else if (
  //   (args && args.join(" ").toLowerCase() == "utility") ||
  //   (args && args[0].toLowerCase() == "nsfw")
  // ) {
  //   const cmds = client.commands
  //     .filter((cmd) => cmd.help.category.toLowerCase() === "utility")
  //     .map(
  //       (cmd) =>
  //         `\`${cmd.help.name} ${" ".repeat(
  //           11 - Number(cmd.help.name.length)
  //         )} :\``
  //     );

  //   let embed = new MessageEmbed()
  //     .setColor(`#f50041`)
  //     .setFooter(message.author.username, message.author.avatarURL())
  //     .setTitle(`${client.emoji.utility}  |  Utility`)
  //     .setDescription(`● ${cmds.join("\n● ")}`)
  //     .setTimestamp();

  //   message.channel.send(embed);
  // } else if (
  //   (args && args.join(" ").toLowerCase() == "information") ||
  //   (args && args[0].toLowerCase() == "information")
  // ) {
  //   const cmds = client.commands
  //     .filter((cmd) => cmd.help.category.toLowerCase() === "information")
  //     .map(
  //       (cmd) =>
  //         `\`${cmd.help.name} ${" ".repeat(
  //           13 - Number(cmd.help.name.length)
  //         )} :\``
  //     );

  //   let embed = new MessageEmbed()
  //     .setColor(`#f50041`)
  //     .setFooter(message.author.username, message.author.avatarURL())
  //     .setTitle(`${client.emoji.administration}  | Information`)
  //     .setDescription(`● ${cmds.join("\n● ")}`)
  //     .setTimestamp();

  //   message.channel.send(embed);
  if (
    (args[0] && args[0] !== "utility") ||
    "nsfw" ||
    "moderation" ||
    "fun" ||
    "admin"
  ) {
    return;
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
