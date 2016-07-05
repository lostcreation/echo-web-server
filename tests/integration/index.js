const ECHO_WEB_SERVER_HOST = '127.0.0.1'
const ECHO_WEB_SERVER_PORT = '2000'

const http = require('http')
const fork = require('child_process').fork

const startServer = require('./spawn-server.js').start

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
    res.on('error', reject)
  })
}

function onFailure(e) {
  console.log(`Problem with request: ${e.message}`);
  tests.fail++
  return (e)
}

function tryRequest (path = '/') {
  console.log(`Requesting: ${path}`)
  const r = {
    'path': encodeURI(path),
    'host': ECHO_WEB_SERVER_HOST,
    'port': ECHO_WEB_SERVER_PORT
  }
  return new Promise((resolve, reject) => {
    http.request(r, resolve).on('error', reject).end();
  })
}

let server = startServer(ECHO_WEB_SERVER_HOST, ECHO_WEB_SERVER_PORT)

server.stop()

// server.promise.then(tryRequest('/'))
//   .then(onSuccess)
//   .catch(onFailure)
//   .then(report)
//   .then(server.stop)

// tryRequest("/<script>alert('Leet Hax!')</script>")
//   .then(onSuccess)
//   .catch(onFailure)
