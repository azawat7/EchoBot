const { db } = require("../../echoDB")

module.exports.help = {
	name: "get",
	aliases: [],
	category: "🎆 owner",
	description: "recondb utility",
	ownerOnly: true,
	userPerms: ['ADMINISTRATOR'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}

module.exports.run = async (client, message, args) => {
    await db.delete(args[0]);
}