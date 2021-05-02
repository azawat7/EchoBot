const { Collection } = require("discord.js");
config = require("../../config")

module.exports = async (client, message) => {
// Si la commande ne contient pas le prefix alors return

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

// Toutes les constantes requises au message.js

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

// Cherche les commandes et inclus les aliases

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

//

  if (!command) return message.channel.send(`This command doesn't exist`);

// Cooldwons

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
      return message.reply(`You can use this command in ${timeLeft.toFixed(0)}s !`)
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args);
}