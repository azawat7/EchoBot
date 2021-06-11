const { Client, Collection, MessageEmbed, TextChannel } = require("discord.js");
const GiveawayManagerWithOwnDatabase = require("../util/giveaways");
const { loadCommands, loadEvents } = require("../util/loaders");
const { DiscordTogether } = require("discord-together");

module.exports = class EchoClient extends Client {
  constructor(options = {}, sentry) {
    super({
      partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"],
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: true,
      cacheEmojis: true,
      cachePresences: false,
      fetchAllMembers: true,
      disableMentions: "everyone",
      messageCacheMaxSize: 25,
      messageCacheLifetime: 10000,
      messageSweepInterval: 12000,
      ws: {
        intents: [
          "GUILDS",
          "GUILD_MEMBERS",
          "GUILD_MESSAGES",
          "GUILD_EMOJIS",
          "GUILD_MESSAGE_REACTIONS",
          "GUILD_VOICE_STATES",
        ],
      },
    });

    (this.partials = [
      "MESSAGE",
      "CHANNEL",
      "REACTION",
      "GUILD_MEMBER",
      "USER",
    ]),
      (this.mongoose = require("../util/mongo"));
    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.config = require("../config");
    this.colors = require("../assets/json/colors.json");
    this.emoji = require("../assets/json/emojis.json");
  }

  async start(token = this.config.token) {
    TextChannel.prototype.sendErrorMessage = function (content, file) {
      const embed = new MessageEmbed()
        .setColor(this.client.colors.echo)
        .setDescription(`${this.client.emoji.cross} **${content}**`);
      return this.send(embed, file);
    };
    // Creates functions
    require("../util/functions/functions.js")(this);
    require("../util/functions/dbFunctions.js")(this);
    // Discord Buttons
    require("discord-buttons")(this);
    require("discord-slider")(this);
    // Creates discordTogether client
    this.discordTogether = new DiscordTogether(this);
    // Creates the giveaway manager
    const manager = new GiveawayManagerWithOwnDatabase(this, {
      updateCountdownEvery: 10000,
      default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        embedColorEnd: "#000000",
        reaction: "🎉",
      },
    });

    this.giveawaysManager = manager;
    //////////////

    loadCommands(this);
    loadEvents(this);
    console.log("----------------------------");
    this.mongoose.init();
    this.login(token);
  }
};
