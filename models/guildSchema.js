const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const reqString = {
  type: String,
  required: true,
};

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: reqString,

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
});

module.exports = mongoose.model("Guild", guildSchema);
