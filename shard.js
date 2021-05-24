const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./main.js", {
  token: process.env.token,
  totalShards: 1,
});

manager.spawn();
manager.on("shardCreate", (shard) => console.log(`Shard ${shard.id} launched`));
