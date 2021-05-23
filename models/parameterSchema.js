const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const parameterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: reqString,
  guildName: reqString,
  experiencePerMessage: {
    type: Number,
  },
  experienceMultiplicator: {
    type: Number,
  },
});

module.exports = mongoose.model("Parameter", parameterSchema);
