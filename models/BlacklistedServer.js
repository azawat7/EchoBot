const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  blacklistedServer: String,
});

module.exports = mongoose.model("BlacklistServer", ownerSchema);
