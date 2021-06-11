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
});

module.exports = mongoose.model("Guild", guildSchema);
