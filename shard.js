const { ShardingManager } = require("discord.js");

// Create your ShardingManger instance
const manager = new ShardingManager("./main.js", {
  // for ShardingManager options see:
  // https://discord.js.org/#/docs/main/v12/class/ShardingManager
  totalShards: 3,
  token: process.env.TOKEN,
});

manager.on("shardCreate", (shard) =>
  console.log(`⭕ Shard ${shard.id} launched`)
);

// Spawn your shards
manager.spawn();

console.log("----------------------------");
