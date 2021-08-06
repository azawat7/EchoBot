const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  modules: {
    tickets: {
      ticketCase: { type: Number, default: 0 },
      ticketLimit: { type: Number, default: 1 },
      embeds: {
        panelEmbed: { title: String, description: String, footer: String },
        welcomeEmbed: { title: String, description: String, footer: String },
        closedEmbed: { title: String, description: String, footer: String },
        reopenEmbed: { title: String, description: String, footer: String },
        deleteEmbed: { title: String, description: String, footer: String },
      },
      buttons: {
        panelButton: { label: String },
        closeButton: { label: String },
        reopenButton: { label: String },
        deleteButton: { label: String },
      },
    },
  },
  level: {
    enabled: {
      type: Boolean,
    },
  },
  guildID: {
    type: String,
    required: true,
    unique: true,
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
  warnings: [],
  users: [],
  commands: [],
  giveaways: [],

  logs: {
    levels: { type: String },
    lvlena: { type: Boolean, required: true, default: false },
  },
  premium: {
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
    expire: {
      type: Number,
    },
    permanent: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  antiAlt: {
    enabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    time: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  autoRole: {
    enabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "undefined",
    },
  },
  roles: {
    inviteReward: [],
    levelReward: [],
    modRoles: [String],
    adminRoles: [String],
  },
});

module.exports = mongoose.model("Guild", guildSchema);
