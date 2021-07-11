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
  console.log(
    `\x1b[35m[Commands] \x1b[37mLoaded ${client.commands.size} commands !`
  );
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
  console.log(`\x1b[35m[Events] \x1b[37mLoaded ${eventFiles.length} events !`);
};

const loadSlashCommands = (client, dir = "./slashCommands") => {
  const arrayOfSlashCommands = [];

  readdirSync(dir).forEach((dirs) => {
    const slashCommands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const command of slashCommands) {
      const pull = require(`../${dir}/${dirs}/${command}`);
      client.slashCommands.set(pull.name, pull);

      arrayOfSlashCommands.push(pull);
    }
  });

  client.on("ready", async () => {
    await client.guilds.cache
      .get("838062586615955466")
      .commands.set(arrayOfSlashCommands);
  });
};

module.exports = {
  loadCommands,
  loadEvents,
  loadSlashCommands,
};
