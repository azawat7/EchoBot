const { MessageEmbed } = require("discord.js");
const { readdirSync, forEach } = require('fs')
const categoryList = readdirSync('./commands')

module.exports.help = {
  name: "help",
  aliases: [],
  category: "information",
  expectedArgs: "\`<command_name>\`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
	userPerms: [],
	clientPerms: [],
  nsfw: false,
  cooldown: 3
}

module.exports.run = (client, message, args, language, settings) => {



    if (!args.length) {
      let categories = [];

      const dirEmojis = {
        Admin: `${client.emoji.administration}`,
        Moderation: `${client.emoji.moderation}`,
        Fun: `${client.emoji.fun}`,
        Information: `${client.emoji.information}`,
        Utility: `${client.emoji.utility}`,
        NSFW: `${client.emoji.nsfw}`
      }

      const ignoredCategories = ['Owner']

      readdirSync("./commands/").forEach((dir) => {
        if(ignoredCategories.includes(dir)) return;
        const editedName = `${dirEmojis[dir]} ${dir}`;

        let data = new Object();

        data = {
          name: `${editedName}`,
          value: `\`${settings.prefix}help ${dir.toLowerCase()}\``,
          inline: true
        };

        categories.push(data);
      });

      let embed = new MessageEmbed()
      .setAuthor(`${language.TITLE1}`, `https://i.imgur.com/45UIEsS.png`, )
      .setColor(`#f50041`)
      .setDescription(`${language.EDES1} \`${settings.prefix}\``)
      .addFields(categories)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());

      return message.channel.send(embed)
    } else if(args && args.join(" ").toLowerCase() == "admin"  || args && args[0].toLowerCase() == "admin") {

        const cmds = (client.commands.filter(
          cmd => cmd.help.category.toLowerCase() === "admin")
          .map((cmd => `\`${cmd.help.name} ${" ".repeat(13 - Number(cmd.help.name.length))} :\``
          )))


        let embed = new MessageEmbed()
          .setColor(`#f50041`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`${client.emoji.administration}  | Admin`)
          .setDescription(`● ${cmds.join('\n● ')}`)
          .setTimestamp()

        message.channel.send(embed)

    } else if (args && args.join(" ").toLowerCase() == "fun"  || args && args[0].toLowerCase() == "fun") {

      const cmds = (client.commands.filter(
        cmd => cmd.help.category.toLowerCase() === "fun")
        .map(cmd => `\`${cmd.help.name} ${" ".repeat(11 - Number(cmd.help.name.length))} :\``
        ))


      let embed = new MessageEmbed()
        .setColor(`#f50041`)
        .setFooter(message.author.username, message.author.avatarURL())
        .setTitle(`${client.emoji.fun}  |  Fun`)
        .setDescription(`● ${cmds.join('\n● ')}`)
        .setTimestamp()

      message.channel.send(embed)

  } else if (args && args.join(" ").toLowerCase() == "moderation"  || args && args[0].toLowerCase() == "moderation") {
    const command = client.commands.filter(cmd => cmd.help.category.toLowerCase() === "moderation")
    const lang = require(`../../languages/${settings.language}/${command.help.category}/${command.help.name}`)

    const cmds = (client.commands.filter(
      cmd => cmd.help.category.toLowerCase() === "moderation")
      .map(cmd => `\`${cmd.help.name} ${" ".repeat(14 - Number(cmd.help.name.length))} :\` ${lang.DESCRIPTION}`
      ))


    let embed = new MessageEmbed()
      .setColor(`#f50041`)
      .setFooter(message.author.username, message.author.avatarURL())
      .setTitle(`${client.emoji.moderation}  |  Moderation`)
      .setDescription(`● ${cmds.join('\n● ')}`)
      .setTimestamp()

    message.channel.send(embed)

} else if (args && args.join(" ").toLowerCase() == "nsfw"  || args && args[0].toLowerCase() == "nsfw") {

  const cmds = (client.commands.filter(
    cmd => cmd.help.category.toLowerCase() === "nsfw")
    .map(cmd => `\`${cmd.help.name} ${" ".repeat(7 - Number(cmd.help.name.length))} :\``
    ))


  let embed = new MessageEmbed()
    .setColor(`#f50041`)
    .setFooter(message.author.username, message.author.avatarURL())
    .setTitle(`${client.emoji.nsfw}  |  NSFW`)
    .setDescription(`● ${cmds.join('\n● ')}`)
    .setTimestamp()

  message.channel.send(embed)

} else if (args && args.join(" ").toLowerCase() == "utility"  || args && args[0].toLowerCase() == "nsfw") {

  const cmds = (client.commands.filter(
    cmd => cmd.help.category.toLowerCase() === "utility")
    .map(cmd => `\`${cmd.help.name} ${" ".repeat(11 - Number(cmd.help.name.length))} :\``
    ))


  let embed = new MessageEmbed()
    .setColor(`#f50041`)
    .setFooter(message.author.username, message.author.avatarURL())
    .setTitle(`${client.emoji.utility}  |  Utility`)
    .setDescription(`● ${cmds.join('\n● ')}`)
    .setTimestamp()

  message.channel.send(embed)
  } else if(args[0] !== 'utility' || 'nsfw' || 'moderation' || 'fun' || 'admin') {
      const command = client.commands.get(args[0]) || client.commands.find(command => command.help.aliases && command.help.aliases.includes(args[0]))

      const sembed = new MessageEmbed()
        .setColor(`#f50041`)
        .setDescription(`${client.emoji.cross} **${language.ERROR}**`)

      if(!command) return message.channel.send(sembed)

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
    