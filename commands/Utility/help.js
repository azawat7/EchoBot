const { MessageEmbed } = require("discord.js");
const { readdirSync } = require('fs')
const categoryList = readdirSync('./commands')

module.exports.help = {
  name: "help",
  aliases: [],
  category: "utility",
  expectedArgs: "\`<command_name>\`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
	userPerms: [],
	clientPerms: [],
  nsfw: false,
  cooldown: 3
}

module.exports.run = async (client, message, args, language, settings) => {
    if (!args.length) {
      let categories = [];

      const dirEmojis = {
        Admin: "👑",
        Fun: "🎭",
        Moderation: "🔧",
        Utility: "🔨",
        NSFW: "🔞"
      }

      const ignoredCategories = ['Owner']

      readdirSync("./commands/").forEach((dir) => {
        if(ignoredCategories.includes(dir)) return;
        const editedName = `${dirEmojis[dir]} ${dir}`;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.filter((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          return !file.help.hidden;
        }).map((command) => {
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
      .setAuthor(`${language.TITLE1}`, `https://i.imgur.com/45UIEsS.png`, )
      .setColor(`#f50041`)
      .setDescription(`${language.EDES1}\`${settings.prefix}${language.EDES2}`)
      .addFields(categories)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());

      return message.channel.send(embed)
    } else {
      const command = client.commands.get(args[0]) || client.commands.find(command => command.help.aliases && command.help.aliases.includes(args[0]))
      const lang = require(`../../languages/${settings.language}/${command.help.category}/${command.help.name}`)
      const embed = new MessageEmbed()
        .setColor(`#f50041`)
        .setAuthor(`${language.TITLE2}\`${command.help.name}\` ${language.TITLE2P2}`)
        .addField(`📃 ${language.DES}`, `\`${lang.DESCRIPTION}\``)
        .addField(`⏱ ${language.COOLDOWN}`, `\`${command.help.cooldown} ${language.SECOND}\``)
        .addField(`🧿 ${language.USAGE}`, command.help.expectedArgs ? `\`${settings.prefix}${command.help.name}\` \`${command.help.expectedArgs}\`` : `\`${settings.prefix}${command.help.name}\``)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
        if (command.help.aliases.length > 0) embed.addField(`🔖 Alias`, `\`${command.help.aliases.join('\`, \`')}\``)
        if (command.help.nsfw) embed.addField(`🔞 ${language.NSFW}`, `\`${language.NSFW1}\``)
        if (command.help.ownerOnly) embed.addField(`❌ ${language.OWNERONLY}`, `\`${language.OWNERONLY1}\``)
      return message.channel.send(embed)
    }
  };
    