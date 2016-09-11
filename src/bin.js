#!/usr/bin/env node

'use strict'
// Dependencies
const server = require('./echo-web-server.js')
const logAsHTML = require('./loggers/as-html')
const logToConsole = require('./loggers/to-console')

const argv = process.argv.splice(2)

// ENV defaults
const host = getValueForFlag('-h', argv) || process.env['ECHO_WEB_SERVER_HOST']
const port = getValueForFlag('-p', argv) || process.env['ECHO_WEB_SERVER_PORT']

// Our server

// Start the server.
const { stop, addLogger } = server.start(port, host, ({host, port}) => {
  console.log(`Server running at http://${host}:${port}/`)
})

// Add our default loggers.
addLogger(logAsHTML, logToConsole)

// Create a new logger that gives us a way to gracefully shutdown the server
// when given a "secret" url. This would be a bad idea in a real application,
// but it's safe enough for testing.
addLogger(({host, port, url}) => {
  if (url === '/stop/stop/stop') {
    stop(() => {
      console.log(`[${host}:${port}] Recieved shutdown request "/stop/stop/stop"`)
      console.log(`[${host}:${port}] The Server will shut down!`)
    })
  }
})

// Quick helper function to find any specific command line flags the user may
// have passed in.
function getValueForFlag (flag, args) {
  const i = args.indexOf(flag)
  if (i === -1) return undefined
  return args[i + 1]
}
