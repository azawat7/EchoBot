const fetch = require('node-fetch');

module.exports.help = {
    name: 'pussy',
    aliases: [],
	category: "NSFW",
	description: "Sends you 😺Images.",
	expectedArgs: null,
	minArgs: 0,
	maxArgs: 0,
	ownerOnly: false,
	userPerms: [],
	clientPerms: [],
	nsfw: true,
	cooldown: 1
}

module.exports.run = async (client, message, args) => {
        try {
            var subreddits = [
                'pussy',
                'vagina',
                'PerfectPussies',
                'rearpussy',
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