const app = require("express")();

module.exports = async (client) => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
  let activities = [
    `@{echo} on ${client.guilds.cache.size} guilds`,
    `@{echo} on ${client.users.cache.size} users`,
  ];
  setInterval(function () {
    let activity = activities[Math.floor(Math.random() * activities.length)];

    client.user.setPresence({
      activity: {
        name: activity,
        type: "WATCHING",
        status: "dnd",
      },
    });
  }, 10000);
};
