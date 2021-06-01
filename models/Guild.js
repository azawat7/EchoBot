const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const reqString = {
  type: String,
  required: true,
};

const falseString = {
  type: Boolean,
  default: false,
};

const nullString = {
  type: String,
  enabled: false,
  default: null,
};

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
    default: defaults.prefix,
  },
  language: {
    type: String,
    required: true,
    default: defaults.language,
  },
  users: [],
  logs: {
    enabled: falseString,
    // Logs Channels
    moderationChannel: nullString,
    channelsChannel: nullString,
    guildsChannel: nullString,
    messageChannel: nullString,
    membersChannel: nullString,
    voiceChannel: nullString,
    // Moderation
    ban: falseString,
    kick: falseString,
    unban: falseString,
    clear: falseString,
    // Giveaways
    gcreate: falseString,
    gdelete: falseString,
    gend: falseString,
    greroll: falseString,
    // Channels
    channelCreate: falseString,
    channelUpdate: falseString,
    channelDelete: falseString,
    // Guilds
    guildBanAdd: falseString,
    guildBanRemove: falseString,
    guildEmojisUpdate: falseString,
    guildRoleCreate: falseString,
    guildRoleDelete: falseString,
    guildRoleUpdate: falseString,
    guildUpdate: falseString,
    // Message
    messageDelete: falseString,
    messageDeleteBulk: falseString,
    messageUpdate: falseString,
    // Members
    guildMemberAdd: falseString,
    guildMemberKick: falseString,
    guildMemberRemove: falseString,
    guildMemberUpdate: falseString,
    guildMemberNickUpdate: falseString,
    // Voice
    voiceChannelLeave: falseString,
    voiceChannelJoin: falseString,
    voiceStateUpdate: falseString,
    voiceChannelSwitch: falseString,
  },
});

module.exports = mongoose.model("Guild", guildSchema);
