const ms = require("ms");

let s = Math.floor(ms("12d") * 0.001 + Date.now() * 0.001);

console.log(s);

setSecondTimeout(function () {
  console.log("Timeout.");
}, 5);
