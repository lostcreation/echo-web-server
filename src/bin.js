// #!/usr/bin/env node

'use strict'
// Dependencies
const server = require('./echo-web-server.js')
const logAsHTML = require('./loggers/as-html')
const logToConsole = require('./loggers/to-console')

const argv = process.argv.splice(2)

// ENV defaults
const host = getValueForFlag('-h', argv) || process.env['ECHO_WEB_SERVER_HOST'] || undefined
const port = getValueForFlag('-p', argv) || process.env['ECHO_WEB_SERVER_PORT'] || undefined

// Start the server.
const { stop, addLogger } = server.start(host, port, ({host, port}) => {
  console.log(`[EWS] New server running at http://${host}:${port}/`)
})

addLogger(logAsHTML, logToConsole)

// Create a new logger that gives us a way to gracefully shutdown the server
// when given a "secret" url. This would be a bad idea in a real application,
// but it's safe enough for testing.
addLogger(({host, port, url}) => {
  if (url === '/stop/stop/stop') {
    console.log(`[EWS] ${host}:${port}: Recieved shutdown request "/stop/stop/stop"`)
    stop(console.log.bind(console.log, `[EWS] ${host}:${port}: Is shutting down!`))
  }
})

// Quick helper function to find any specific command line flags the user may
// have passed in.
function getValueForFlag (flag, args) {
  const i = args.indexOf(flag)
  if (i === -1) return undefined
  return args[i + 1]
}
