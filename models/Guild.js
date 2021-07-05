const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  users: [],
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
});

module.exports = mongoose.model("Guild", guildSchema);
