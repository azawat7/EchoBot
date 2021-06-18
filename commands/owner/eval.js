const { owners } = require("../../config");

module.exports.help = {
  name: "eval",
  hidden: true,
  aliases: ["e"],
  category: "owner",
  expectedArgs: "`<js_code>`",
  minArgs: 1,
  maxArgs: 1000,
  ownerOnly: true,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
};

module.exports.run = async (client, message, args, language, settings) => {
  const content = message.content.split(" ").slice(1).join(" ");
  const result = new Promise((resolve, reject) => resolve(eval(content)));

  return result
    .then((output) => {
      if (typeof output !== "string")
        output = require("util").inspect(output, { depth: 0 });
      if (output.includes(process.env.TOKEN))
        output = output.replace(
          process.env.TOKEN,
          "hehe there is no token for u"
        );
      return message.channel.send(output, { code: "js" });
    })
    .catch((err) => {
      err = err.toString();
      if (err.includes(process.env.TOKEN))
        err = err.replace(process.env.TOKEN, "`hehe there is no token for u`");
      return message.channel.send(err, { code: "js" });
    });
};
