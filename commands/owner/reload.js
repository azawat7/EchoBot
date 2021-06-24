const { MessageEmbed } = require("discord.js");
const glob = require("glob");

module.exports.help = {
  name: "reload",
  aliases: ["rl"],
  category: "owner",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  ownerOnly: true,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
};

module.exports.run = async (client, message, args, language, settings) => {
  const embed = new MessageEmbed().setColor(client.colors.echo);
  client.commands.sweep(() => true);
  glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
    if (err) return console.log(err);
    filePaths.forEach((file) => {
      delete require.cache[require.resolve(file)];
      const pull = require(file);
      if (pull.help.name) {
        client.commands.set(pull.help.name, pull);
      }
    });
  });
  embed.setDescription(`${client.emoji.check} **${language.SUCCESS}**`);
  message.channel.send({ embed: embed });
};
