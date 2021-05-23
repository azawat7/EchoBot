const { readdirSync } = require("fs");

const loadEvents = (client, dir = "./event/") => {
  const eventFiles = readdirSync(`${dir}/`).filter((files) =>
    files.endsWith(".js")
  );

  for (const eventFile of eventFiles) {
    const evt = require(`../${dir}/${eventFile}`);
    const evtName = eventFile.split(".")[0];
    client.on(evtName, evt.bind(null, client));
  }
  console.log(`✅ Loaded ${eventFiles.length} events !`);
};
module.exports = {
  loadEvents,
};
