const { owners } = require("../config");
const { Collection, MessageEmbed } = require("discord.js");
const { Guild, BlacklistServer } = require("../models/index");
const { isInvite } = require("../util/anti-invite");
const replace = require("replacer-js");
const Chance = require("chance");
var chance = new Chance();

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  if (!message.guild.me.permissions.has(["SEND_MESSAGES"]))
    if (message.author.bot === true) return;

  const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
  const embed = new MessageEmbed().setColor(client.colors.echo);

  ///////////////////////////////////////////
  //            No Guild In DB             //
  ///////////////////////////////////////////

  const settings = await client.getGuild(message.guild);
  if (!settings) return;

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
    message.channel.send({ embeds: [embed] });
    prefix = mentionRegex;
  }

  ///////////////////////////////////////////
  //            User Database              //
  ///////////////////////////////////////////

  const position = settings.users.map((e) => e.id).indexOf(message.author.id);
  // console.log(position);
  const userInfo = settings.users[position];

  // Creates a new user in the DB
  if (message.guild && position == -1) {
    return Guild.updateOne(
      { guildID: message.guild.id },
      {
        $push: {
          users: {
            id: message.author.id,
            level: {
              experience: 100,
              levels: 1,
              color: "ffffff",
              lastUpdated: new Date(),
            },
            money: {
              wallet: 0,
              bank: 0,
            },
          },
        },
      }
    ).then();
  }

  ///////////////////////////////////////////
  //                 Level                 //
  ///////////////////////////////////////////

  if (message.guild?.id === "838062586615955466") {
    const n = chance.d100();
    if (n >= 50 && n <= 75) {
      const xpToAdd = chance.d30();
      client.addXp(message.author, message.guild, xpToAdd, userInfo);
    }
  }

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
    if (!owners.includes(message.author.id) && command.help.enabled === false) {
      return message.channel.sendErrorMessage(
        `${replace(lan.DISABLED, {
          "{inviteLink}": "https://discord.gg/gDf3zG3e",
        })}`
      );
    }
    // Guild Enabled Verification
    if (settings.commands.includes(command.help.name)) {
      return message.channel.sendErrorMessage(
        replace(lan.GUILDDISABLED, {
          "{owner}": message.guild.owner.user.tag,
        })
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
    return message.channel.sendErrorMessage(
      `${lan.CLIENTPERMS} ${missingPerms(
        message.guild.me,
        command.help.clientPerms
      )} !\nhttps://discord.com/developers/docs/topics/permissions`
    );
  }

  // User Permissions
  if (settings.roles.modRoles.length) {
    if (
      !owners.includes(message.author.id) &&
      command.help.moderator &&
      client.checkMod(message.member, settings.roles.modRoles) === false
    ) {
      return message.channel.sendErrorMessage(
        `${lan.USERPERMS} ${missingPerms(
          message.member,
          command.help.userPerms
        )} !\nhttps://discord.com/developers/docs/topics/permissions`
      );
    }
  } else if (settings.roles.adminRoles.length) {
    if (
      !owners.includes(message.author.id) &&
      command.help.admin &&
      client.checkAdmin(message.member, settings.roles.adminRoles) === false
    ) {
      return message.channel.sendErrorMessage(
        `${lan.USERPERMS} ${missingPerms(
          message.member,
          command.help.userPerms
        )} !\nhttps://discord.com/developers/docs/topics/permissions`
      );
    }
  } else {
    if (
      !owners.includes(message.author.id) &&
      command.help.userPerms &&
      !message.member.permissions.has(command.help.userPerms)
    ) {
      return message.channel.sendErrorMessage(
        `${lan.USERPERMS} ${missingPerms(
          message.member,
          command.help.userPerms
        )} !\nhttps://discord.com/developers/docs/topics/permissions`
      );
    }
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

  command.run(client, message, args, language, settings, userInfo);
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
