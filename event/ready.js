module.exports = async (client) => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
  let activities = [
    `$help on ${client.guilds.cache.size} guilds`,
    `$help on ${client.users.cache.size} users`,
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
