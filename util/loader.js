const { readdirSync } = require ("fs");

// Command Handler pour les commandes

const loadCommands = (client, dir = ("./commands/")) => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
 
    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Command Loaded : ${getFileName.help.name}`);
    };
  });
};

// Command Handler pour les events

const loadEvents = (client, dir = ("./event/")) => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
 
    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(`Event Loaded : ${evtName}`);
    };
  });
};

// Load les handlers

module.exports = {
  loadCommands,
  loadEvents,
}