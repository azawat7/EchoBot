const { db } = require("../../echoDB")

module.exports.help = {
	name: "get",
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
    const data = await db.get(args[0])
    return console.log(data)
}