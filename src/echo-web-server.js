'use strict'

// Dependencies
const http = require('http')

// Server Config
function start (port = '8080', host = '0.0.0.0', callback) {
  // Handle special case for an auto-port.
  if (port === 'auto') port = 0

  // Unless it has loggers, our server won't do anything.
  const loggers = []

  /**
   * Adds a logging function. Without at least one logging function, the server
   * will not do anything. When we recieve a request, the server will pass a
   * `requestInfo` object to every registered logger.
   */
  const addLogger = loggers.push.bind(loggers)

  /**
   * Starts a server at the port and host indicated.
   * @param {string} [port='8080'] - Open port or 'auto' to assign a random free port.
   * @param {string} [host='0.0.0.0'] - IP or host name
   * @returns {function} - Stop this server then execute an optional callback function.
   */
  const server = http.createServer((req, res) => {
    const requestInfo = Object.freeze({
      res,
      host,
      port,
      client: req.connection.remoteAddress,
      url: decodeURI(req.url)
    })
    res.statusCode = 404
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'close')
    loggers.forEach((log) => log(requestInfo))
    res.end()
  })

  server.listen(port, host, () => {
    host = server.address().address
    port = server.address().port
    callback && callback({ host, port, running: true })
  })

  return {
    addLogger,
    stop (callback) {
      process.disconnect && process.disconnect()
      server.listening && server.close(callback)
    }
  }
}

// Exports
module.exports = {
  start
}

