const {MessageEmbed} = require('discord.js')
const answers = [
    'Maybe.',
    'Certainly not.',
    'I hope so.',
    'Not in your wildest dreams.',
    'There is a good chance.',
    'Quite likely.',
    'I think so.',
    'I hope not.',
    'I hope so.',
    'Never!',
    'Fuhgeddaboudit.',
    'Ahaha! Really?!?',
    'Pfft.',
    'Sorry, bucko.',
    'Hell, yes.',
    'Hell to the no.',
    'The future is bleak.',
    'The future is uncertain.',
    'I would rather not say.',
    'Who cares?',
    'Possibly.',
    'Never, ever, ever.',
    'There is a small chance.',
    'Yes!'
]; 

module.exports.help = {
	name: "8ball",
	aliases: ["eightball"],
	category: "fun",
	description: "Ask a question and get a answer.",
	expectedArgs: "\`<question\`",
	minArgs: 1,
	maxArgs: null,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}

module.exports.run = async (client, message, args) => {
    let yq = args.join(' ') 

    let q = args.join(' ').endsWith('?')

    const anembed = new MessageEmbed()
        .setColor('#f50041')
        .setDescription(`${client.cross} **That doesn\'t seem to be a question ! (maybe you forgot the \`?\`)**`)

    if (!q)

        return message.channel.send(anembed).then(m => m.delete({ timeout: 10000 }))

    else {

    const embed = new MessageEmbed()
        .setAuthor(`🎱 ${message.author.username} Asks Me?`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Your question:** \n ${yq} \n**My Answer:** \n ${answers[Math.floor(Math.random() * answers.length)]}`)
        .setColor('#f50041')

    message.channel.send(embed)
    }
}
