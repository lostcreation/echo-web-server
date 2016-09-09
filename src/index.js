const server = require('./echo-web-server')
const loggers = {
  asHTML: require('./loggers/asHTML'),
  toConsole: require('./loggers/toConsole')
}

module.exports = {
  server,
  loggers
}
