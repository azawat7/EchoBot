const figlet = require("figlet");

module.exports.help = {
  name: "ascii",
  aliases: ["text-art"],
  category: "fun",
  expectedArgs: "`<text_to_convert>`",
  minArgs: 1,
  maxArgs: null,
  ownerOnly: false,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
};

module.exports.run = async (client, message, args) => {
  figlet.text(
    args.join(" "),
    {
      font: "",
    },
    async (err, data) => {
      message.channel.send(`\`\`\`${data}\`\`\``);
    }
  );
};
