const app = require("express")();

module.exports = async (client) => {
  console.log(`\x1b[31m[Client] \x1b[37mLogged in as ${client.user.tag}!`);
};
