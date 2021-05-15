module.exports.help = {
	name: "eval",
	hidden: true,
	aliases: [],
	category: "owner",
	expectedArgs: "\`<js_code>\`",
	minArgs: 1,
	maxArgs: 1000,
	ownerOnly: true,
	userPerms: [],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}

module.exports.run = async (client, message, args) => {
    function clean(text) {
        if (typeof text === "string") 
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
      }
     
      if (message.author.id !== "406108846575058944") return;
      const code = args.join(" ");
      const evaled = eval(code);
      const cleanCode = await clean(evaled);
      message.channel.send(cleanCode, { code: "js" });
}