const EchoClient = require("./structures/Echo.js");
require("dotenv").config();

const Echo = new EchoClient();

Echo.start();

if (Echo.config.dashboard === true) {
  const Dashboard = require("./dashboard/app.js");
  Dashboard(Echo);
}
