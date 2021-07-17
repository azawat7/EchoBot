const { MessageEmbed } = require("discord.js");
const { readdirSync, statSync } = require("fs");
const replace = require("replacer-js");

module.exports = {
  name: "help",
  description: "You need help !?",
  category: "information",
  options: [
    {
      name: "category-command",
      description: "Command/Category name.",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction, args, language, settings) => {
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
    ];

    ///////////////////////////////////////////
    //        Main Embed Categories          //
    ///////////////////////////////////////////

    if (!args[0]) {
      let categories = [];

      const dirEmojis = {
        admin: `${client.emoji.administration} - ${language.ADMIN}`,
        moderation: `${client.emoji.moderation} - ${language.MODERATION}`,
        fun: `${client.emoji.fun} - ${language.FUN}`,
        information: `${client.emoji.information} - ${language.INFO}`,
        utility: `${client.emoji.utility} - ${language.UTILITY}`,
        image: `${client.emoji.image} - ${language.IMAGE}`,
      };

      const ignoredCategories = ["owner"];

      readdirSync("./commands/").forEach((dir) => {
        if (ignoredCategories.includes(dir)) return;
        const editedName = `**${dirEmojis[dir]}**`;

        let data = new Object();

        const path = `./commands/${dir}/`;
        let cmdSize = getDirLenght(path);

        data = {
          name: `${editedName} [${cmdSize}]`,
          value: `\`${settings.prefix}help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(data);
      });

      let embed = new MessageEmbed()
        .setAuthor(`📬 ${language.TITLE1}`)
        .setColor(client.colors.echo)
        .setDescription(
          `${replace(language.EDES1, {
            "{prefix}": settings.prefix,
          })}\n${replace(language.EDES3, {
            "{prefix}": settings.prefix,
          })}\n\n __**${language.CAT}**__`
        )
        .addFields(categories)
        .setTimestamp()
        .setFooter(
          interaction.member.user.username,
          interaction.member.user.avatarURL()
        );

      return interaction.reply({ embeds: [embed] });
    }

    if (category.includes(args[0].toLowerCase())) {
      // if (args[0].toLowerCase() == "nsfw" || !interaction.channel.nsfw) {
      //   return interaction.channel.sendErrorMessage(`👀 ${language.NONSFW}`);
      // }
      let catwcmd = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (file.help.hidden) return;

          if (!file.help.name) return "No command name.";

          let name = file.help.name.replace(".js", "");
          let category = file.help.category;

          let emo = file.help.emoji || "";

          let obj = {
            cname: `${emo ? `${emo} - \`${name}\`` : `\`${name}\``}`,
            cdes: jsondes(
              settings.language,
              file.help.category,
              file.help.name
            ),
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          data = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: `${co.cdes}`,
            inline: true,
          };
          catwcmd.push(data);
        });
      });

      let embed = new MessageEmbed()
        .setColor(client.colors.echo)
        .setFooter(interaction.user.username, interaction.user.avatarURL())
        .setTitle(`${client.capitalize(args[0])} ${language.CMD} :`)
        .addFields(catwcmd)
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
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

      const errembed = new MessageEmbed()
        .setColor(`#f50041`)
        .setDescription(`${client.emoji.cross} **${language.ERROR}**`);

      if (!command) return interaction.reply({ embeds: [errembed] });

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
        .setFooter(interaction.user.username, interaction.user.avatarURL());

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
        embed.addField(
          `❌ ${language.OWNERONLY}`,
          `\`${language.OWNERONLY1}\``
        );
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

      return interaction.reply({ embeds: [embed] });
    }
  },
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
