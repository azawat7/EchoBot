const mongoose = require("mongoose");

const reqString = {
    'type': String,
    'required': true
}

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: reqString,
  guildName: reqString,
  userID: reqString,
  username: reqString,
  experience: {
    "type": Number,
    "default": 0
  },
  level: {
    "type": Number,
    "default": 0
  },
});

module.exports = mongoose.model("User", userSchema);