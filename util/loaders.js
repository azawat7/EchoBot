const { readdirSync } = require("fs");

const loadCommands = (client, dir = "./commands/") => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const pull = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(pull.help.name, pull);
    }
  });
  console.log(`✅ Loaded ${client.commands.size} commands !`);
};

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
  loadCommands,
  loadEvents,
};
