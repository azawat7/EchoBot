const { bgBlue, black, green } = require("chalk");

class Logger {
  static log(content, type = "log") {
    switch (type) {
      // Check the message type and then print him in the console
      case "log": {
        return console.log(`${bgBlue(type.toUpperCase())} ${content} `);
      }
      case "warn": {
        return console.log(`${black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "error": {
        return console.log(`${black.bgRed(type.toUpperCase())} ${content} `);
      }
      case "debug": {
        return console.log(`${green(type.toUpperCase())} ${content} `);
      }
      case "cmd": {
        return console.log(`${black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case "ready": {
        return console.log(`${black.bgGreen(type.toUpperCase())} ${content}`);
      }
      default:
        throw new TypeError(
          "Logger type must be either warn, debug, log, ready, cmd or error."
        );
    }
  }
}

module.exports = Logger;
