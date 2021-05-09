const mongoose = require("mongoose");

const reqString = {
    'type': String,
    'required': true
}

const warnsSchema = mongoose.Schema({
  guildid: String,
  user: String,
  content: Array
});

module.exports = mongoose.model("Warns", warnsSchema);