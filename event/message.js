const { owners } = require("../config")
const { Collection, MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
    const settings = await client.getGuild(message.guild);   
        
    ///////////////////////////////////////////

    if (message.author.bot) return;

    ///////////////////////////////////////////

    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const commandName = args.shift().slice(settings.prefix.lenght).toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName))

    ///////////////////////////////////////////

    if (!message.content.toLowerCase().startsWith(settings.prefix)) return;

    const lan = require(`../languages/${settings.language}/message`)

    const noCommand = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${lan.NOCOMMAND}**`)

    if (!command) return message.channel.send(noCommand)


    ///////////////////////////////////////////

    let ownerOnlyEmbed = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.cross} **${lan.OWNERONLY}**`)

    let userPerms = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.cross} **${lan.USERPERMS} ${missingPerms(message.member, command.help.userPerms)} !**`)

    let clientPerms = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.cross} **${lan.CLIENTPERMS} ${missingPerms(message.guild.me, command.help.clientPerms)} !**`)

    let nsfwEmbed = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.cross} **${lan.NSFW}**`)

    let noArgs = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.cross} **${lan.NOARGS}**`)

    let incorrectSyntax = new MessageEmbed()
        .setColor("#f50041")
        .setDescription(`${client.emoji.cross} **${lan.INCSYNTAX} \`${settings.prefix}${command.help.name}\` ${command.help.expectedArgs}**`)

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

    if (command.help.maxArgs === 0 && args.length > 0) {
        return message.channel.send(noArgs)
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
            .setDescription(`${client.emoji.cross} **${lan.COOLDOWN1} **\`${timeLeft.toFixed(0)}s\`**  ${lan.COOLDOWN2}**`)
          return message.channel.send(cooldownEmbed)
        }
      }
    
      tStamps.set(message.author.id, timeNow);
      setTimeout(() => tStamps.delete(message.author.id), cdAmount);      
      
      const language = require(`../languages/${settings.language}/${command.help.category}/${command.help.name}`)

    ///////////////////////////////////////////

    command.run(client, message, args, language, settings)

}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.lenght > 1 ?
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
}
