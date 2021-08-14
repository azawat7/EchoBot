const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const { readdirSync, statSync } = require("fs");
const replace = require("replacer-js");

module.exports.help = {
  name: "help",
  aliases: [],
  category: "information",
  expectedArgs: "`[command/category_name]`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "❓",
};

module.exports.run = async (client, message, args, language, settings) => {
  function jsondes(lan, cat, name) {
    const file = require(`../../languages/${lan}/${cat}/${name}`);
    // if (!file.endsWith(".json")) throw TypeError("This is not a JSON file !");
    if (file) {
      const des = file.DESCRIPTION || language.NODES;
      return des;
    }
  }

  const category = [
    "admin",
    "fun",
    "image",
    "information",
    "moderation",
    "utility",
    "level",
  ];

  ///////////////////////////////////////////
  //        Main Embed Categories          //
  ///////////////////////////////////////////

  if (!args[0]) {
    let embed = new MessageEmbed()
      .setAuthor(`📬 ${language.TITLE1}`)
      .setColor(client.colors.echo)
      .setDescription(
        `${replace(language.EDES1, {
          "{prefix}": settings.prefix,
        })}\n${replace(language.EDES3, {
          "{prefix}": settings.prefix,
        })}\n${language.EDES4}`
      )
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());

    const menu = new MessageSelectMenu()
      .setCustomId(`help-category-menu-${message.author.id}`)
      .setPlaceholder(`${language.PLACEHOLDER}`)
      .setMaxValues(1)
      .addOptions(
        client.categories(language).map((cat) => {
          return {
            emoji: cat.emoji,
            label: cat.label,
            value: cat.value,
          };
        })
      );

    const menus = new MessageActionRow().addComponents(menu);

    return message.channel.send({
      embeds: [embed],
      components: [menus],
    });
  }

  ///////////////////////////////////////////
  //       Individual Command Help         //
  ///////////////////////////////////////////

  if (args[0]) {
    const command =
      client.commands.get(args[0]) ||
      client.commands.find(
        (command) =>
          command.help.aliases && command.help.aliases.includes(args[0])
      );

    if (!command) return message.channel.sendErrorMessage(language.ERROR);

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
    if (command.help.moderator)
      embed.addField(`🔨 ${language.MODROLE}`, `\`${language.MMM}\``);
    if (command.help.admin)
      embed.addField(`👑 ${language.ADMINROLE}`, `\`${language.AAA}\``);
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

    return message.channel.send({ embeds: [embed] });
  }
};

function getDirLenght(dir) {
  let files = readdirSync(dir);
  let arrayOfFiles = [];

  files.forEach(function (file) {
    if (statSync(dir + "/" + file).isDirectory()) {
      arrayOfFiles = getAllDirFiles(dir + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(file);
    }
  });

  return arrayOfFiles.length;
}
