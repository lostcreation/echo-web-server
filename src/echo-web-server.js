'use strict'

// Dependencies
const http = require('http')

// Server Config
function start (port = '8080', host = '0.0.0.0', callback) {
  // Handle special case for an auto-port.
  if (port === 'auto') port = 0

  // Unless it has loggers, our server won't do anything.
  const loggers = []

  const addLogger = loggers.push.bind.loggers

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

  function stop (callback) {
    process.disconnect && process.disconnect()
    server.listening && server.close(callback)
  }

  return { addLogger, stop }
}

// Exports
module.exports = {
  start
}

