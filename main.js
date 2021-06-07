const EchoClient = require("./structures/Echo");
const { MessageEmbed, TextChannel } = require("discord.js");
require("dotenv").config();

const Echo = new EchoClient();

TextChannel.prototype.sendErrorMessage = function (content, file) {
  const embed = new MessageEmbed()
    .setColor(this.client.colors.echo)
    .setDescription(`${this.client.emoji.cross} **${content}**`);
  return this.send(embed, file);
};

Echo.start();
