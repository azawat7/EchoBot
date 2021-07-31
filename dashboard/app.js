const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const { Guild } = require("../models/index");

module.exports = async (client) => {
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  app.set("view engine", "ejs");
  app.use(express.static("dashboard/static"));

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      url: res,
      req: req,
    };
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };

  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });
  app.get("/privacy", (req, res) => {
    renderTemplate(res, req, "privacy.ejs");
  });
  app.get("/leaderboard", async (req, res) => {
    // renderTemplate(res, req, "leaderboard.ejs");
    const guild = req.query.guild;
    if (!guild) {
      res.send("Please specify guild as a query !");
      return;
    }
    if (guild) {
      const settings = await Guild.findOne({ guildID: guild });

      if (!settings) {
        res.send("This guild has no user stored in the DB.");
        return;
      }
      if (settings) {
        const data = [];
        settings.users.forEach((user) => {
          if (user.level.experience > 100) {
            data.push({
              id: user.id,
              experience: user.level.experience,
              level: user.level.levels,
            });
          }
        });

        const sortedArray = data.sort((a, b) => b.experience - a.experience);
        i = 1;

        const mappedArray = sortedArray
          .map(
            (u) =>
              `${i++}. ${
                client.users.cache.get(u.id)
                  ? client.users.cache.get(u.id).tag
                  : "Not Found"
              }<br/>- Level : ${u.level}<br/>- Experience : ${u.experience}`
          )
          .join("<br/><br/>");

        return res.send(
          `${client.guilds.cache.get(guild).name}<br/><br/>${mappedArray}`
        );
      }
    }
  });

  app.listen(port, () =>
    console.log(`Dashboard running on http://45.77.63.91:${port}`)
  );
};
