const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Pong !",
  category: "utility",
  run: async (client, interaction, args) => {
    interaction.reply({ content: "🏓 Pong !", ephemeral: true });
  },
};
