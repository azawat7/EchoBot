const { readdirSync } = require("fs");

const loadCommands = (client, dir = ("./commands/")) => {
    readdirSync(dir).forEach(dirs => {
      const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
   
      for (const file of commands) {
        const pull = require(`../${dir}/${dirs}/${file}`);
        client.commands.set(pull.help.name, pull);
      };
    });
    console.log(`✅ Loaded ${client.commands.size} commands !`);
  };

module.exports = {
  loadCommands
}