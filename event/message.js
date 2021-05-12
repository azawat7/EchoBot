const { owners } = require("../config")
const { Collection, MessageEmbed } = require('discord.js');
const { codePointAt } = require("ffmpeg-static");

module.exports = async (client, message) => {
    client.cross = client.emojis.cache.find(emoji => emoji.name === "echo_cross");
    client.check = client.emojis.cache.find(emoji => emoji.name === "echo_check");
    const settings = await client.getGuild(message.guild);

    if (message.author.bot) return;

    ///////////////////////////////////////////

    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const commandName = args.shift().slice(settings.prefix.lenght).toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName))

    ///////////////////////////////////////////

    if (!message.content.toLowerCase().startsWith(settings.prefix)) return;
    if (!command) return;

    ///////////////////////////////////////////

    let ownerOnlyEmbed = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **Only Azawat can use this command !**`)

    let userPerms = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **You must have the following permissions : ${missingPerms(message.member, command.help.userPerms)} !**`)

    let clientPerms = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **I am missing the following permissions : ${missingPerms(message.guild.me, command.help.clientPerms)} !**`)

    let nsfwEmbed = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **You can only use this command in NSFW channel !**`)

    let noArgs = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **You should not use any arguments for this command !**`)

    let ynArgs = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **You can use this command witout and with args ! Ex: \`${settings.prefix}${command.help.name}\` ${command.help.expectedArgs}**`)

    let incorrectSyntax = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.cross} **Incorrect syntax ! Use \`${settings.prefix}${command.help.name}\` ${command.help.expectedArgs}**`)

    ///////////////////////////////////////////

    if (command.help.ownerOnly && !owners.includes(message.author.id)) 
        return message.channel.send(ownerOnlyEmbed);

    if (command.help.userPerms && !message.member.permissions.has(command.help.userPerms))
        return message.channel.send(userPerms);

    if (command.help.clientPerms && !message.guild.me.permissions.has(command.help.clientPerms))
        return message.channel.send(clientPerms);

    ///////////////////////////////////////////

    if (command.help.nsfw && !message.channel.nsfw)
        return message.channel.send(nsfwEmbed)

    ///////////////////////////////////////////

    if (command.help.expectedArgs === null) {
        return message.channel.send(noArgs)
    }

    if (args.length > command.help.minArgs === 0 || command.help.maxArgs > 0) {
        return message.channel.send(ynArgs)
    }

    if (args.length < command.help.minArgs || (command.help.maxArgs !== null && args.length > command.help.maxArgs)) {
        return message.channel.send(incorrectSyntax) 
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
            .setDescription(`${client.cross} **Please wait **\`${timeLeft.toFixed(0)}s\`**  before using this command again !**`)
          return message.channel.send(cooldownEmbed)
        }
      }
    
      tStamps.set(message.author.id, timeNow);
      setTimeout(() => tStamps.delete(message.author.id), cdAmount);       

    ///////////////////////////////////////////

    command.run(client, message, args, settings)

}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.lenght > 1 ?
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
}