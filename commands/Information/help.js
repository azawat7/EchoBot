const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const replace = require("replacer-js");

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

module.exports.run = (client, message, args, language, settings) => {
  if (!args.length) {
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
      const editedName = `${dirEmojis[dir]} ${client.capitalize(`${dir}`)}`;

      let data = new Object();

      data = {
        name: editedName,
        value: `\`${settings.prefix}help ${dir.toLowerCase()}\``,
        inline: true,
      };

      categories.push(data);
    });

    let embed = new MessageEmbed()
      .setAuthor(
        `${language.TITLE1} (Page 1/2)`,
        `https://i.imgur.com/45UIEsS.png`
      )
      .setColor(`#f50041`)
      .setDescription(
        `>>> ${replace(language.EDES, {
          "{n_commands}": client.commands.size,
        })}\n${replace(language.EDES1, {
          "{prefix}": settings.prefix,
        })}`
      )
      .addFields(categories)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());

    let secondembed = new MessageEmbed()
      .setAuthor(
        `Information per command (Page 2/2)`,
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

    // return ReactionPages(message, pages, textPageChange, emojis, time);

    // message.channel.send(secondembed);
    // return message.channel.send(embed);
  } else if (
    (args && args.join(" ").toLowerCase() == "admin") ||
    (args && args[0].toLowerCase() == "admin")
  ) {
    const cmds = client.commands
      .filter((cmd) => cmd.help.category.toLowerCase() === "admin")
      .map(
        (cmd) =>
          `\`${cmd.help.name} ${" ".repeat(
            13 - Number(cmd.help.name.length)
          )} :\``
      );

    let embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setFooter(message.author.username, message.author.avatarURL())
      .setTitle(`${client.emoji.administration}  | Admin`)
      .setDescription(`● ${cmds.join("\n● ")}`)
      .setTimestamp();

    message.channel.send(embed);
  } else if (
    (args && args.join(" ").toLowerCase() == "fun") ||
    (args && args[0].toLowerCase() == "fun")
  ) {
    const cmds = client.commands
      .filter((cmd) => cmd.help.category.toLowerCase() === "fun")
      .map(
        (cmd) =>
          `\`${cmd.help.name} ${" ".repeat(
            11 - Number(cmd.help.name.length)
          )} :\``
      );

    let embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setFooter(message.author.username, message.author.avatarURL())
      .setTitle(`${client.emoji.fun}  |  Fun`)
      .setDescription(`● ${cmds.join("\n● ")}`)
      .setTimestamp();

    message.channel.send(embed);
  } else if (
    (args && args.join(" ").toLowerCase() == "moderation") ||
    (args && args[0].toLowerCase() == "moderation")
  ) {
    const cmds = client.commands
      .filter((cmd) => cmd.help.category.toLowerCase() === "moderation")
      .map(
        (cmd) =>
          `\`${cmd.help.name} ${" ".repeat(
            14 - Number(cmd.help.name.length)
          )} :\``
      );

    let embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setFooter(message.author.username, message.author.avatarURL())
      .setTitle(`${client.emoji.moderation}  |  Moderation`)
      .setDescription(`● ${cmds.join("\n● ")}`)
      .setTimestamp();

    message.channel.send(embed);
  } else if (
    (args && args.join(" ").toLowerCase() == "nsfw") ||
    (args && args[0].toLowerCase() == "nsfw")
  ) {
    const cmds = client.commands
      .filter((cmd) => cmd.help.category.toLowerCase() === "nsfw")
      .map(
        (cmd) =>
          `\`${cmd.help.name} ${" ".repeat(
            8 - Number(cmd.help.name.length)
          )} :\``
      );

    let embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setFooter(message.author.username, message.author.avatarURL())
      .setTitle(`${client.emoji.nsfw}  |  nsfw`)
      .setDescription(`● ${cmds.join("\n● ")}`)
      .setTimestamp();

    message.channel.send(embed);
  } else if (
    (args && args.join(" ").toLowerCase() == "utility") ||
    (args && args[0].toLowerCase() == "nsfw")
  ) {
    const cmds = client.commands
      .filter((cmd) => cmd.help.category.toLowerCase() === "utility")
      .map(
        (cmd) =>
          `\`${cmd.help.name} ${" ".repeat(
            11 - Number(cmd.help.name.length)
          )} :\``
      );

    let embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setFooter(message.author.username, message.author.avatarURL())
      .setTitle(`${client.emoji.utility}  |  Utility`)
      .setDescription(`● ${cmds.join("\n● ")}`)
      .setTimestamp();

    message.channel.send(embed);
  } else if (
    (args && args.join(" ").toLowerCase() == "information") ||
    (args && args[0].toLowerCase() == "information")
  ) {
    const cmds = client.commands
      .filter((cmd) => cmd.help.category.toLowerCase() === "information")
      .map(
        (cmd) =>
          `\`${cmd.help.name} ${" ".repeat(
            13 - Number(cmd.help.name.length)
          )} :\``
      );

    let embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setFooter(message.author.username, message.author.avatarURL())
      .setTitle(`${client.emoji.administration}  | Information`)
      .setDescription(`● ${cmds.join("\n● ")}`)
      .setTimestamp();

    message.channel.send(embed);
  } else if (
    args[0] !== "utility" ||
    "nsfw" ||
    "moderation" ||
    "fun" ||
    "admin"
  ) {
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
      embed.addField(`🔮 ${language.EXAM}`, `● ${example1}`);
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
