const { readdirSync, lstatSync } = require('fs')
const path = require('path')

module.exports = (client) => {
  const baseFile = 'cmd-base.js'
  const commandBase = require(`./${baseFile}`)

  const commands = []

  const readCommands = (dir) => {
    const files = readdirSync(path.join(__dirname, '../', 'commands', dir))
    for (const file of files) {
      const stat = lstatSync(path.join(__dirname, '../', 'commands', dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile && file !== 'cmd-loader.js') {
        const option = require(path.join(__dirname, '../', 'commands', dir, file))
        commands.push(option)
        if (client) {
          commandBase(client, option)
        }
      }
    }
  }

  readCommands('.')

  return commands
}