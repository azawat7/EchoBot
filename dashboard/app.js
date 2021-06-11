const express = require("express");
const app = express();
const port = process.env.PORT || 8666;
const path = require("path");

module.exports = async (client) => {
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
  // EJS

  app.set("view engine", "ejs");
  app.use(express.static("dashboard/static"));

  //

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      url: res,
      title: client.username,
      req: req,
      name: client.username,
      tag: client.tag,
    };
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };

  //
  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });

  app.get("/api", function (req, res) {
    res.header("Content-Type", "application/json");
    res.send(
      `{
     "guilds": "` +
        client.guilds.cache.size +
        `",
     "members": "` +
        client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) +
        `",
     "channels": "` +
        client.channels.cache.size +
        `"
    }`
    );
  });

  app.get("*", (req, res) => {
    renderTemplate(res, req, "404.ejs");
  });

  app.listen(port, () =>
    console.log(`Dashboard running on https://localhost:${port}`)
  );
};
