const EchoClient = require("./structures/Echo");
require("dotenv").config();

const Echo = new EchoClient();

// if (Echo.config.dashboard === true) {
//   const Dashboard = require("./dashboard/app.js");
//   Dashboard(Echo);
// }

Echo.start();
