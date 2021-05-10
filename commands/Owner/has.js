const { db } = require("../../echoDB")

module.exports.help = {
	name: "has",
	hidden: true,
	aliases: [],
	category: "owner",
	description: "recondb utility",
	ownerOnly: true,
	userPerms: ['ADMINISTRATOR'],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}

module.exports.run = async (client, message, args) => {
    const data = await db.has(args[0])
    return console.log(data)
}