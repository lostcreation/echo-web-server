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
  console.log('Added logger ran!')
  if (url == '/stop/stop/stop') {
    stop(() => {
        console.log(`
echo | The Server at running at
echo | http://${host}:${port}/
echo | is shutting down!
`)
    })
  }
})
