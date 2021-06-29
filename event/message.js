const { owners } = require("../config");
const { Collection, MessageEmbed } = require("discord.js");
const { Guild, BlacklistServer } = require("../models/index");
const { isInvite } = require("../util/anti-invite");
const replace = require("replacer-js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;

  // let prefix;
  const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
  const embed = new MessageEmbed().setColor(client.colors.echo);

  ///////////////////////////////////////////
  //            No Guild In DB             //
  ///////////////////////////////////////////

  const settings = await client.getGuild(message.guild);
  if (!settings) {
    return message.channel.sendErrorMessage(
      `**This guild was not found in the DB, please try again !**`
    );
  }
  const lan = require(`../languages/${settings.language}/message`);

  ///////////////////////////////////////////
  //             Bot Mention               //
  ///////////////////////////////////////////

  if (message.content.match(mentionRegex)) {
    embed.setTimestamp;
    embed.setTitle(`📓 ${lan.MENTION1}`);
    embed.setDescription(
      `${replace(lan.MENTION2, {
        "{prefix}": settings.prefix,
        "{prefix1}": settings.prefix,
      })}`
    );
    embed.addField(`📌 ${lan.MENTIONLINK}`, [
      `**${lan.MENTIONSUPPORT} :** [${lan.CLICKHERE}](https://discord.gg/5eaZdWygQf)`,
      `**${lan.MENTIONINVITE} :** [${lan.CLICKHERE}](https://discord.com/oauth2/authorize?client_id=838061935039610921&scope=bot&permissions=8589934591)`,
    ]);
    message.channel.send({ embed: embed });
  }

  ///////////////////////////////////////////
  //            User Database              //
  ///////////////////////////////////////////

  const position = settings.users.map((e) => e.id).indexOf(message.member.id);

  // Creates a new user in the DB
  if (message.guild && position == -1) {
    Guild.updateOne(
      { guildID: message.guild.id },
      {
        $push: {
          users: {
            id: message.member.id,
            level: {
              experience: 0,
              level: 0,
            },
            money: {
              wallet: 0,
              bank: 0,
            },
          },
        },
      }
    ).then((d) => console.log(`New user !`));
  }

  ///////////////////////////////////////////
  //             Anti Invite               //
  ///////////////////////////////////////////

  // if (message.content.includes("discord.gg/")) {
  //   const code = message.content.split("discord.gg/")[1];
  //   const isOurInvite = await isInvite(message.guild, code);
  //   if (!isOurInvite) {
  //     message.delete();
  //     return message.channel.sendErrorMessage("no advertising");
  //   }
  // }

  ///////////////////////////////////////////
  //         Command Requirements          //
  ///////////////////////////////////////////

  const args = message.content.slice(settings.prefix.length).split(/ +/);
  const commandName = args.shift().slice(settings.prefix.lenght).toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
    );

  ///////////////////////////////////////////
  //           Some Verification           //
  ///////////////////////////////////////////

  // If there is no prefix
  if (!message.content.toLowerCase().startsWith(settings.prefix)) return;

  if (!command) {
    // No Command
    return message.channel.sendErrorMessage(`${lan.NOCOMMAND}`);
  } else {
    // Blacklist Verification
    const blacklisted = await BlacklistServer.findOne({
      blacklistedServer: message.guild.id,
    });
    if (blacklisted) {
      return message.channel.sendErrorMessage(`${lan.BLACKLIST}`);
    }

    // Enabled Verification
    if (command.help.enabled === false) {
      return message.channel.sendErrorMessage(
        `${replace(lan.DISABLED, {
          "{inviteLink}": "https://discord.gg/gDf3zG3e",
        })}`
      );
    }
  }

  ///////////////////////////////////////////
  //           Command Structure           //
  ///////////////////////////////////////////

  // Owner Only
  if (command.help.ownerOnly && !owners.includes(message.author.id)) {
    return message.channel.sendErrorMessage(`${lan.OWNERONLY}`);
  }

  // Premium Verification
  if (
    !owners.includes(message.author.id) &&
    command.help.premium &&
    settings.premium.isPremium === false
  ) {
    return message.channel.sendErrorMessage(`**${lan.PREMIUM}**`);
  }

  // NSFW Check
  if (
    !owners.includes(message.author.id) &&
    command.help.nsfw &&
    !message.channel.nsfw
  ) {
    return message.channel.sendErrorMessage(`**${lan.PREMIUM}**`);
  }

  // Bot Permissions
  if (
    !owners.includes(message.author.id) &&
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

  // User Permissions
  if (
    !owners.includes(message.author.id) &&
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

  ///////////////////////////////////////////
  //          Command Args Error           //
  ///////////////////////////////////////////

  if (command.help.maxArgs === 0 && args.length > 0) {
    return message.channel.sendErrorMessage(`**${lan.NOARGS}**`);
  }

  const language = require(`../languages/${settings.language}/${command.help.category}/${command.help.name}`);

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
  //               Cooldown                //
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
  //            Run The Command            //
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
