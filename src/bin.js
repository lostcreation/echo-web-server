console.log(process.argv)

// ENV defaults
const host = process.env['ECHO_WEB_SERVER_HOST']
const port = process.env['ECHO_WEB_SERVER_PORT']

// Our server
const server = require('./echo-web-server.js')

// Start the server using our defaults.
const stop = server.start(port, host, ({host, port}) => {
  console.log(`Server running at http://${host}:${port}/`)
})

server.addLogger(({host, port, url}) => {
  if (url === '/stop/stop/stop') {
    stop(() => {
      console.log(`[${host}:${port}] Recieved shutdown request "/stop/stop/stop"`)
      console.log(`[${host}:${port}] The Server will shot down!`)
    })
  }
})
