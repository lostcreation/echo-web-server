const ECHO_WEB_SERVER_HOST = '127.0.0.1'
const ECHO_WEB_SERVER_PORT = '2000'

const serverOptions = {
  env: {
    ECHO_WEB_SERVER_HOST,
    ECHO_WEB_SERVER_PORT
  }
}

const http = require('http')
const server = require('child_process').fork('./lib/echo-web-server.js', [], serverOptions)
server.on('close', (signal) => {
  console.log(`child process terminated due to receipt of signal ${signal}`)
})
server.on('error', (err) => {
  console.log('Failed to start web server.')
})

const tests = {
  run   : 0,
  pass  : 0,
  fail  : 0
}

function report() {
  console.log(`
    ==============================
    Test results:
    ------------------------------
    Tests Run:         ${tests.run}
    Tests Passed:      ${tests.pass}
    Tests Failed:      ${tests.fail}
    ==============================
  `)
}

function onSuccess(res) {
  return new Promise((resolve, reject) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      tests.pass++
      resolve()
    })
  })
}

function onFailure(e) {
  console.log(`Problem with request: ${e.message}`);
  tests.fail++
}

function tryRequest (path = '/') {
  const r = {
    'path': encodeURI(path),
    'host': ECHO_WEB_SERVER_HOST,
    'port': ECHO_WEB_SERVER_PORT
  }
  return new Promise((resolve, reject) => {
    http.request(r, resolve).on('error', reject).end();
  })
}

tryRequest('/')
  .then(onSuccess)
  .catch(onFailure)
  .then(report)
  .then(server.kill)

// tryRequest("/<script>alert('Leet Hax!')</script>")
//   .then(onSuccess)
//   .catch(onFailure)
