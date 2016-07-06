// ENV defaults
const host = process.env['ECHO_WEB_SERVER_HOST'];
const port = process.env['ECHO_WEB_SERVER_PORT'];

// Our server
const server = require('./echo-web-server.js')

// Start the server using our defaults.
const stop = server.start(port, host, ({host, port}) => {
  console.log(`Server running at http://${host}:${port}/`)
})

server.addLogger(({host, port, url}) => {
  if (url === '/stop/stop/stop') {
    stop(() => {
        console.log(`
  !!! Received request to '/stop/stop/stop'
  !!! The Server at:
  !!!       http://${host}:${port}/
  !!! is shutting down!`)
    })
  }
})

