const app = require("express")();

module.exports = async (client) => {
  console.log(`\x1b[31m[Client] \x1b[37mLogged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "my self x)",
      type: "COMPETING",
    },
  });
};
