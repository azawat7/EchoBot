const fetch = require('node-fetch');

module.exports.help = {
    name: 'boobs',
    aliases: ['boob', 'boobies'],
	category: "NSFW",
	description: "Sends you a random boob image 🍒.",
	expectedArgs: null,
	minArgs: 0,
	maxArgs: 0,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: true,
	cooldown: 3
}

module.exports.run = async (client, message, args) => {
        try {
            var subreddits = [
                'boobs',
                'Boobies',
                'Stacked',
                'BustyPetite',
                'Cleavage',
                'bustyasians',
                'boltedontits',
                'burstingout'
              ]
  
          var reddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        
          const data = await fetch(`https://meme-api.herokuapp.com/gimme/${reddit}`).then(res => res.json())
  
          if (!data) return message.channel.send(`Sorry, seems like i can't connect to API.`);
        
          const { title, postLink, url, subreddit } = data
  
          message.channel.send({
            embed: {
              color: "BLURPLE",
              title: `${title}`,
              url: `${postLink}`,
              image: {
                url: url
              },
              footer: { text: `/reddit/${subreddit}` }
            }
          });
        } catch(error) {
          client.emit("apiError", error, message);
        }
    }