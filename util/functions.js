const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.formatBytes = (bytes) => {
    if (bytes === 0) return "0 -_- 0";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };
  client.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1);
  };

  client.embedError = (string) => {
    const embed = new MessageEmbed()
      .setColor(client.colors.echo)
      .setDescription(`${client.emoji.cross} ${string}`);
    return channel.send(embed);
  };
};
