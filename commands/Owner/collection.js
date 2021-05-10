const { db } = require("../../echoDB")

module.exports.help = {
	name: "collection",
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
    return console.log(await db.collection())
}