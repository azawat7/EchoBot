const { readdirSync } = require('fs')
const path = require('path')
const fs = require('fs')

const baseFile = 'command-base.js'
  const commandBase = require(`../util/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }


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

readCommands('commands')
loadEvents(client)