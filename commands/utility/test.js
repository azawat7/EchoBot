const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createAdvancedSlider } = require("discord-epagination");
const { Guild } = require("../../models/index");
const Captcha = require("@haileybot/captcha-generator");

module.exports.help = {
  name: "test",
  aliases: [],
  category: "utility",
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: true,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 3,
  // hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  // let captcha = new Captcha();
  // let Capt = new MessageAttachment(captcha.JPEGStream, "captcha.jpeg");

  // message.channel.send(`Value : ${captcha.value}`, Capt);
  const memberR = message.mentions.users.first();
  client.createUserWarn(message.guild, memberR, {
    id: "12345",
    date: Date.now(),
    moderator: message.author.id,
    reason: "Test",
  });
};
