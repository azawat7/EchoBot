const MESSAGES = {
    COMMANDS: {
        HELP: {
            HELP : {
              name: "help",
              aliases: ["help"],
              description: "Display commands.",
              cooldown: 1,
              usage: ""
            }
        },
        UTILITY: {
            GENERATE : {
              name: "generate",
              aliases: ["gen"],
              description: "Generate a troll build for league of legends.",
              cooldown: 1,
              usage: ""
            }
        }
    }
}

exports.MESSAGES = MESSAGES;