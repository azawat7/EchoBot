const { readdirSync } = require("fs");
const path = require("path");

const loadCommands = (client, dir = `.${path.sep}commands${path.sep}`) => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}${path.sep}${dirs}${path.sep}`).filter(
      (files) => files.endsWith(".js")
    );

    for (const file of commands) {
      const pull = require(`..${path.sep}${dir}${path.sep}${dirs}${path.sep}${file}`);
      const lan = require(`../languages/english/${pull.help.category}/${pull.help.name}`);
      pull.help.description = lan.DESCRIPTION;
      client.commands.set(pull.help.name, pull);
    }
  });
  console.log(
    `\x1b[35m[Commands] \x1b[37mLoaded ${client.commands.size} commands !`
  );
};

const loadEvents = (client, dir = `.${path.sep}event${path.sep}`) => {
  const eventFiles = readdirSync(`${dir}${path.sep}`).filter((files) =>
    files.endsWith(".js")
  );

  for (const eventFile of eventFiles) {
    const evt = require(`..${path.sep}${dir}${path.sep}${eventFile}`);
    const evtName = eventFile.split(".")[0];
    client.on(evtName, evt.bind(null, client));
  }
  console.log(`\x1b[35m[Events] \x1b[37mLoaded ${eventFiles.length} events !`);
};

const loadSlashCommands = (
  client,
  dir = `.${path.sep}slashCommands${path.sep}`
) => {
  const arrayOfSlashCommands = [];

  readdirSync(dir).forEach((dirs) => {
    const slashCommands = readdirSync(
      `${dir}${path.sep}${dirs}${path.sep}`
    ).filter((files) => files.endsWith(".js"));

    for (const command of slashCommands) {
      const pull = require(`..${path.sep}${dir}${path.sep}${dirs}${path.sep}${command}`);
      client.slashCommands.set(pull.name, pull);

      // if (["MESSAGE", "USER"].includes(pull.help.type))
      //   delete pull.help.description;
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
