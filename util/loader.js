const { readdirSync } = require('fs')

const loadCommands = (client, dir = ("./commands/")) => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
 
    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.name, getFileName);
      console.log(`🍪 Command Loaded : ${file}`);
    };
  });
};


const loadEvents = (client, dir = ("./event/")) => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
 
    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(`🍩 Event Loaded : ${evtName}`);
    };
  });
};

module.exports = {
  loadCommands,
  loadEvents,
}