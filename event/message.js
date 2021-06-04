const { owners } = require("../config");
const { Collection, MessageEmbed } = require("discord.js");
const { Guild, BlacklistServer } = require("../models/index");
const replace = require("replacer-js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;

  const embed = new MessageEmbed().setColor(client.colors.echo);

  ///////////////////////////////////////////

  const settings = await client.getGuild(message.guild);
  if (!settings) {
    embed.setDescription(
      `${client.emoji.cross} **This guild was not found in the DB, please try again !**`
    );
    message.channel.send(embed);
    return;
  }
  const lan = require(`../languages/${settings.language}/message`);
  const position = settings.users.map((e) => e.id).indexOf(message.member.id);

  if (message.guild && position == -1) {
    Guild.updateOne(
      { guildID: message.guild.id },
      {
        $push: {
          users: {
            id: message.member.id,
            lvlexperience: 0,
            lvllevel: 0,
          },
        },
      }
    ).then((d) => console.log(`New user !`));
  }

  ///////////////////////////////////////////

  const args = message.content.slice(settings.prefix.length).split(/ +/);
  const commandName = args.shift().slice(settings.prefix.lenght).toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
    );

  const language = require(`../languages/${settings.language}/${command.help.category}/${command.help.name}`);

  ///////////////////////////////////////////

  if (!message.content.toLowerCase().startsWith(settings.prefix)) return;

  if (!command) {
    return message.channel.sendErrorMessage(`${lan.NOCOMMAND}`);
  } else {
    const blacklisted = await BlacklistServer.findOne({
      blacklistedServer: message.guild.id,
    });
    if (blacklisted) {
      return message.channel.sendErrorMessage(`${lan.BLACKLIST}`);
    }

    if (message.guild.me.permissions.has(["USE_EXTERNAL_EMOJIS"])) {
      message.react(client.emoji.check);
    } else {
      message.react("✅");
    }
  }

  ///////////////////////////////////////////

  if (command.help.ownerOnly && !owners.includes(message.author.id)) {
    return message.channel.sendErrorMessage(`${lan.OWNERONLY}`);
  }

  if (
    command.help.userPerms &&
    !message.member.permissions.has(command.help.userPerms)
  ) {
    return message.channel.sendErrorMessage(
      `${lan.USERPERMS} ${missingPerms(
        message.member,
        command.help.userPerms
      )} !`
    );
  }

  if (
    command.help.clientPerms &&
    !message.guild.me.permissions.has(command.help.clientPerms)
  ) {
    embed.setDescription(
      `${client.emoji.cross} **${lan.CLIENTPERMS} ${missingPerms(
        message.guild.me,
        command.help.clientPerms
      )} !**`
    );
    return message.channel.sendErrorMessage(
      `${lan.CLIENTPERMS} ${missingPerms(
        message.guild.me,
        command.help.clientPerms
      )} !`
    );
  }

  ///////////////////////////////////////////

  if (command.help.premium && settings.isPremium === false) {
    embed.setDescription(`${client.emoji.cross} **${lan.PREMIUM}**`);
    return message.channel.send(embed);
  }

  if (command.help.nsfw && !message.channel.nsfw) {
    embed.setDescription(`${client.emoji.cross} **${lan.NSFW}**`);
    return message.channel.send(embed);
  }

  ///////////////////////////////////////////

  if (command.help.maxArgs === 0 && args.length > 0) {
    embed.setDescription(`${client.emoji.cross} **${lan.NOARGS}**`);
    return message.channel.send(embed);
  }

  if (
    args.length < command.help.minArgs ||
    (command.help.maxArgs !== null && args.length > command.help.maxArgs)
  ) {
    if (command.help.example === 1) {
      const example1 = replace(language.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      return message.channel.sendErrorMessage(
        `${replace(lan.INCSYNTAX, {
          "{usage}": `\n>>> ● ${example1}`,
        })}`
      );
    } else if (command.help.example === 2) {
      const example1 = replace(language.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example2 = replace(language.EXAMPLE2, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      return message.channel.sendErrorMessage(
        `${replace(lan.INCSYNTAX, {
          "{usage}": `\n>>> ● ${example1}\n ● ${example2}`,
        })}`
      );
    } else if (command.help.example === 3) {
      const example1 = replace(language.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example2 = replace(language.EXAMPLE2, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example3 = replace(language.EXAMPLE3, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      return message.channel.sendErrorMessage(
        `${replace(lan.INCSYNTAX, {
          "{usage}": `\n>>> ● ${example1}\n ● ${example2}\n ● ${example3}`,
        })}`
      );
    } else if (command.help.example === 4) {
      const example1 = replace(language.EXAMPLE1, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example2 = replace(language.EXAMPLE2, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example3 = replace(language.EXAMPLE3, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      const example4 = replace(language.EXAMPLE4, {
        "{cmd_name}": `${settings.prefix}${command.help.name}`,
      });
      return message.channel.sendErrorMessage(
        `${replace(lan.INCSYNTAX, {
          "{usage}": `\n>>> ● ${example1}\n ● ${example2}\n ● ${example3}\n ● ${example4}`,
        })}`
      );
    } else {
      return message.channel.sendErrorMessage(
        `${replace(lan.INCSYNTAX, {
          "{usage}": `\n>>> \`${settings.prefix}${command.help.name}\` ${command.help.expectedArgs}`,
        })}`
      );
    }
  }

  ///////////////////////////////////////////

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  }

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.channel.sendErrorMessage(
        `${replace(lan.COOLDOWN, {
          "{time}": timeLeft.toFixed(0),
        })}`
      );
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  ///////////////////////////////////////////

  command.run(client, message, args, language, settings);
};

const missingPerms = (member, perms) => {
  const missingPerms = member.permissions.missing(perms).map(
    (str) =>
      `\`${str
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b(\w)/g, (char) => char.toUpperCase())}\``
  );

  return missingPerms.lenght > 1
    ? `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}`
    : missingPerms[0];
};
