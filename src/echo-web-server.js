'use strict'

// Dependencies
const http = require('http')
const asHTML = require('./loggers/as-html')
const toConsole = require('./loggers/to-console')

// Exports
module.exports = {
  start
}

/**
 * Starts a server at the port and host indicated.
 * @param {object}   options
 * @param {string}   [options.port='8080']    - Open port or 'auto' to assign a random free port.
 * @param {string}   [options.host='0.0.0.0'] - IP or host name
 * @param {function} [options.ready]          - Callback executed when server is ready to accept incoming connections.
 * @returns {object} [server]                 - Stop this server then execute an optional callback function.
 */
function start ({port = '8080', host = '0.0.0.0', ready} = {}) {
  // Handle special case for an auto-port.
  if (port === 'auto') port = 0

  // Default Loggers
  const loggers = [ toConsole, asHTML ]

  // Create the server we're starting.
  const server = http.createServer((req, res) => {
    const requestInfo = Object.freeze({ res, host, port,
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
    ready && ready({ host, port, running: true })
  })

  return {
    stop (callback) {
      process.disconnect && process.disconnect()
      server.listening && server.close(callback)
    },
    addLogger (logger) {
      loggers.push(logger)
    }
  }
}
