const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.help = {
	name: "binary",
	aliases: ["encode, decode"],
	category: "🎭 fun",
	description: "Encode or decode text into binary code",
	expectedArgs: "\`<encode/decode>\` \`<text_to_convert>\`",
	minArgs: 1,
	maxArgs: null,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}

module.exports.run = async(client, message, args) => {
    const query = args.shift().toLowerCase();
    let word = args.join(" ")
    if(query === 'encode') {
        const { data } = await axios.get(`https://some-random-api.ml/binary?text=${encodeURIComponent(word)}`)
        message.channel.send(data.binary ?? 'An error occured', {code: "",});
    } else if(query === 'decode') {
        const { data } = await axios.get(`https://some-random-api.ml/binary?decode=${encodeURIComponent(word)}`)
        message.channel.send(data.text ?? 'An error occured', {code: "",});
    } else {
        const embed = new MessageEmbed()
            .setColor(client.colors.echo)
            .setDescription(`${client.cross} **That option isn't valid !**`)
        message.channel.send(embed)
    }
}