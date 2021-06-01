const { owners } = require("../config");
const { Collection, MessageEmbed } = require("discord.js");
const { Guild, BlacklistServer } = require("../models/index");

module.exports = async (client, message) => {
  if (message.channel.type === "dm" || !message.guild) {
    return;
  }

  if (message.author.bot) return;

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

  const expCd = Math.floor(Math.random() * 19) + 1;
  const expToAdd = Math.floor(Math.random() * 25) + 10;

  const targetuser = message.guild.member(message.author);
  const userToUpdate = await client.getUser(targetuser);

  const newExp = userToUpdate.lvlexperience + expToAdd;

  if (expCd >= 8 && expCd <= 10) {
    await client.updateUserInfo(message.guild, targetuser, {
      "users.$.lvlexperience": newExp,
    });
  }

  const userLevel = Math.floor(0.06 * Math.sqrt(userToUpdate.lvlexperience));

  const LEVELU = lan.LEVELUP.replace("{userlevel}", userLevel);
  const LEVELP = lan.LEVELDOWN.replace("{userlevel}", userLevel);

  if (userToUpdate.lvllevel < userLevel) {
    embed.setDescription(`😀 **${LEVELU}**`);
    message.channel.send(embed);
    await client.updateUserInfo(message.guild, targetuser, {
      "users.$.lvllevel": userLevel,
    });
  } else if (userToUpdate.lvllevel > userLevel) {
    embed.setDescription(`😂 **${LEVELP}**`);
    message.channel.send(embed);
    await client.updateUserInfo(message.guild, targetuser, {
      "users.$.lvllevel": userLevel,
    });
  }

  ///////////////////////////////////////////

  const args = message.content.slice(settings.prefix.length).split(/ +/);
  const commandName = args.shift().slice(settings.prefix.lenght).toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
    );

  ///////////////////////////////////////////

  if (!message.content.toLowerCase().startsWith(settings.prefix)) return;

  const noCommand = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${lan.NOCOMMAND}**`);

  if (!command) {
    return message.channel.send(noCommand);
  } else {
    const blacklisted = await BlacklistServer.findOne({
      blacklistedServer: message.guild.id,
    });
    if (blacklisted) {
      embed.setDescription(`${client.emoji.cross} ${lan.BLACKLIST}`);
      return message.channel.send(embed);
    }
  }

  ///////////////////////////////////////////

  let ownerOnlyEmbed = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${lan.OWNERONLY}**`);

  let userPerms = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.cross} **${lan.USERPERMS} ${missingPerms(
        message.member,
        command.help.userPerms
      )} !**`
    );

  let clientPerms = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.cross} **${lan.CLIENTPERMS} ${missingPerms(
        message.guild.me,
        command.help.clientPerms
      )} !**`
    );

  let nsfwEmbed = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${lan.NSFW}**`);

  let noArgs = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${lan.NOARGS}**`);

  let incorrectSyntax = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.cross} **${lan.INCSYNTAX} \`${settings.prefix}${command.help.name}\` ${command.help.expectedArgs}**`
    );

  ///////////////////////////////////////////

  // if (command.help.guildOnly && !message.guild) {
  //   return message.user.send(
  //     `Cette commande est disponible uniquement sur les serveurs !`
  //   );
  // }

  if (command.help.ownerOnly && !owners.includes(message.author.id))
    return message.channel.send(ownerOnlyEmbed);

  if (
    command.help.userPerms &&
    !message.member.permissions.has(command.help.userPerms)
  )
    return message.channel.send(userPerms);

  if (
    command.help.clientPerms &&
    !message.guild.me.permissions.has(command.help.clientPerms)
  )
    return message.channel.send(clientPerms);

  ///////////////////////////////////////////

  if (command.help.nsfw && !message.channel.nsfw)
    return message.channel.send(nsfwEmbed);

  ///////////////////////////////////////////

  if (command.help.maxArgs === 0 && args.length > 0) {
    return message.channel.send(noArgs);
  }

  if (
    args.length < command.help.minArgs ||
    (command.help.maxArgs !== null && args.length > command.help.maxArgs)
  ) {
    return message.channel.send(incorrectSyntax);
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
      const cooldownEmbed = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(
          `${client.emoji.cross} **${lan.COOLDOWN1} **\`${timeLeft.toFixed(
            0
          )}s\`**  ${lan.COOLDOWN2}**`
        );
      return message.channel.send(cooldownEmbed);
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  const language = require(`../languages/${settings.language}/${command.help.category}/${command.help.name}`);

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
