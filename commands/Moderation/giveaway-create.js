const { MessageEmbed } = require('discord.js')
const ms = require("ms");

module.exports.help = {
	name: "giveawaycreate",
	aliases: ["gcreate"],
	category: "moderation",
	description: "Everything needed for doing giveaway.",
	expectedArgs: "\`<time_in_m/h/d>\` \`<number_of_winner>\` \`<prize>\`",
	minArgs: 1,
	maxArgs: null,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: false,
	cooldown: 3
}
 
module.exports.run = async (client, message, args) => {

const status = args[0];

const MAX_COUNT = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **You reached the giveaway limit at one time !**`)

const INVTIME = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **Please specify a number !**`)

const MAXTIME = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **You can't create a giveaway that last for more than 15 day !**`)

const TOOWINERS = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.cross} **You need to set a number of winner(s) below 10 and above 1 !**`)

    const currentGiveaways = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id && !g.ended).length;
    if(currentGiveaways > 3){
        return message.channel.send(MAX_COUNT)
    }
    const time = args[0];

    if(isNaN(ms(time))){
        return message.channel.send(INVTIME)
    }

    if(ms(time) > ms("14d")){
        return message.channel.send(MAXTIME)
    }

    const winnersCount = args[1];
    
    if(isNaN(winnersCount) || winnersCount > 10 || winnersCount < 1){
        return message.channel.send(TOOWINERS)
    }

    const prize = args.slice(2).join(" ");

    client.giveawaysManager.start(message.channel, {
        time: ms(time),
        hostedBy: message.author,
        prize: prize,
        winnerCount: parseInt(winnersCount),
        messages: {
            giveaway: '@everyone\n\n🎉 **GIVEAWAY** 🎉',
            giveawayEnded: '@everyone\n\n🎉 **GIVEAWAY ENDED** 🎉',
            timeRemaining: 'Time remaining : **{duration}.**',
            inviteToParticipate: 'React with 🎉 to participate !',
            winMessage: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
            embedFooter: '{echo}',
            noWinner: 'Giveaway cancelled, no valid participations.',
            hostedBy: 'Hosted by: {user}',
            winners: 'winner(s)',
            endedAt: 'Ended at',
            units: {
                seconds: 'seconds',
                minutes: 'minutes',
                hours: 'hours',
                days: 'days',
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    })
}


  
