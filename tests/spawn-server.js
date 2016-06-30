const fork = require('child_process').fork

exports.start = (host, port) => {
  const options = {
    env: {
      'ECHO_WEB_SERVER_HOST': host,
      'ECHO_WEB_SERVER_PORT': port
    }
  }
  const child = fork('./lib/echo-web-server.js', [], options)

  let stop = (signal) => child.kill(signal)

  let promise = new Promise((resolve, reject) => {
    console.log('Starting server...')
    child.on('message', (m) => {
      console.log('... server is ready!')
      m.ready && resolve()
    })
    child.on('error', reject)
    child.on('close', (signal) => {
      console.log(`... server terminated due to receipt of signal ${signal}`)
    })
  })

  return { stop, promise }
}
