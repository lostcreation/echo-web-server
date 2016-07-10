#!/usr/bin/env node

const argv = process.argv.splice(2)

// ENV defaults
const host = getValueForFlag('-h', argv) || process.env['ECHO_WEB_SERVER_HOST']
const port = getValueForFlag('-p', argv) || process.env['ECHO_WEB_SERVER_PORT']

// Our server
const server = require('./echo-web-server.js')

// Start the server, storing the function returned by the `start` method so we
// can gracefully shut downt he server later.
const stop = server.start({port, host, ready: ({host, port}) => {
  console.log(`Server running at http://${host}:${port}/`)
}})

// We'll use the server's addLogger method to give us a way to gracefully
// shutdown the server. This would be a bad idea in a real application, but
// it's safe enough for testing.
server.addLogger(({host, port, url}) => {
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
