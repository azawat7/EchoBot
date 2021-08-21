const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const { Guild } = require("../models/index");
const routes = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const { Permissions } = require("discord.js");

module.exports = async (client) => {
  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };

  require("./strategies/discord");
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  app.set("view engine", "ejs");
  app.use(express.static("dashboard/static"));

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      url: res,
      req: req,
      user: req.user || null,
      inviteLink:
        "https://discord.com/api/oauth2/authorize?client_id=838061935039610921&permissions=8&redirect_uri=http%3A%2F%2F45.77.63.91%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=bot%20applications.commands",
    };
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };

  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////

  app.use(
    session({
      secret: "secret",
      cookie: { maxAge: 60000 * 60 * 24 },
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGOPATH }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes);

  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/");
    } else {
      res.redirect("/api/auth/discord");
    }
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

  app.get("/dashboard", checkAuth, (req, res) => {
    renderTemplate(res, req, "dashboard.ejs", {
      perms: Permissions,
    });
  });

  app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has("MANAGE_GUILD"))
      return res.redirect("/dashboard");

    res.sendStatus(200);
  });

  app.get("/invite", (req, res) => {
    res.redirect(
      "https://discord.com/oauth2/authorize?client_id=838061935039610921&permissions=8&redirect_uri=http%3A%2F%2F45.77.63.91%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=bot%20applications.commands"
    );
  });

  app.get("/privacy", (req, res) => {
    renderTemplate(res, req, "privacy.ejs");
  });

  app.get("/commands", (req, res) => {
    renderTemplate(res, req, "commands.ejs");
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
