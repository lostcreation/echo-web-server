// Dependencies
const http = require('http')
const asHTML = require('./loggers/asHTML.js')

// Default Loggers
const loggers = []
addLogger(toConsole)
addLogger(asHTML)

// Exports
module.exports = { start
                 , toConsole
                 , asHTML
                 , addLogger
                 }


// Server =====================================================================

/**
 * Starts a server at the port and host indicated.
 * @param {string} [port='8080'] - Open port or 'auto' to assign a random free port.
 * @param {string} [host='0.0.0.0'] - IP or host name
 * @returns {function} - Stop this server then execute an optional callback function.
 */
function start (port = '8080', host = '0.0.0.0', callback) {
  // Handle special case for an auto-port.
  if (port === 'auto') port = 0

  // Create the server we're starting.
  const server = http.createServer((req, res) => {
    const requestInfo = Object.freeze({ res, host, port
                                      , client : req.connection.remoteAddress
                                      , url    : decodeURI(req.url)
                                      })
    res.statusCode = 404
    res.setHeader('Cache-Control', 'no-cache')
    loggers.forEach((log) => log(requestInfo))
    res.end()
  })

  server.listen(port, host, () => {
    host = server.address().address
    port = server.address().port
    callback && callback({ host, port, running: true })
  })

  return (callback) => {
    process.disconnect && process.disconnect()
    server.listening && server.close(callback)
  }
}

/**
 * Adds a logging function that will automatically be notified of new
 * requests.
 */
function addLogger (logger) {
  loggers.push(logger)
}




// Loggers ====================================================================

/**
 * Logs request information to the console.
 * @param {Object} requestInfo        - Logging info for the the request.
 * @param {string} requestInfo.client - The IP address for the client.
 * @param {string} requestInfo.url    - The path requested by the client.
 */
function toConsole ({ client, url }) {
  console.log(`Client [${client}] Requested: ${url}`)
}


