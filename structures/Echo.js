const {
  Client,
  Collection,
  MessageEmbed,
  TextChannel,
  Intents,
} = require("discord.js");
const GiveawayManagerWithOwnDatabase = require("../util/giveaways");
const { loadCommands, loadEvents } = require("../util/loaders");
const { DiscordTogether } = require("discord-together");
const antiInvite = require("../util/anti-invite");

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
      // allowedMentions: { parse: ['users', 'roles'], repliedUser: true},
      messageCacheMaxSize: 25,
      messageCacheLifetime: 10000,
      messageSweepInterval: 12000,
      // intents: Intents.ALL,
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

  async start(token = process.env.TOKEN) {
    TextChannel.prototype.sendErrorMessage = function (content) {
      const embed = new MessageEmbed()
        .setColor(this.client.colors.echo)
        .setDescription(`${this.client.emoji.cross} **${content}**`);
      return this.send({ embed });
    };
    TextChannel.prototype.sendSuccessMessage = function (content) {
      const embed = new MessageEmbed()
        .setColor(this.client.colors.echo)
        .setDescription(`${this.client.emoji.check} **${content}**`);
      return this.send({ embed });
    };
    // Creates functions
    require("../util/functions.js")(this);
    // Discord Buttons
    require("discord-buttons")(this);
    // Creates discordTogether client
    this.discordTogether = new DiscordTogether(this);
    // Creates the giveaway manager
    const manager = new GiveawayManagerWithOwnDatabase(this, {
      updateCountdownEvery: 10000,
      default: {
        botsCanWin: false,
        embedColor: `${this.colors.echo}`,
        embedColorEnd: "#424242",
        reaction: "🎉",
      },
    });
    //////////////
    // antiInvite(this);
    //////////////
    this.giveawaysManager = manager;
    //////////////

    loadCommands(this);
    loadEvents(this);
    this.mongoose.init();
    this.login(token);
  }
};
