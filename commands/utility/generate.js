const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, settings) => {
    message.channel.send("hello")
}

module.exports.help = MESSAGES.COMMANDS.UTILITY.GENERATE;