const ECHO_WEB_SERVER_HOST = '0.0.0.0' // any IP, we'll actually request on localhost.
const ECHO_WEB_SERVER_PORT = '2000'

const serverOptions = {
  env: {
    ECHO_WEB_SERVER_HOST,
    ECHO_WEB_SERVER_PORT
  }
}

const requestOptions = {
  'host': 'localhost',
  'port': ECHO_WEB_SERVER_PORT
}

const http = require('http')
const server = require('child_process').fork('./lib/echo-web-server.js', [], serverOptions)

const tests = {
  toRun : 0,
  run   : 0,
  pass  : 0,
  fail  : 0
}

server.on('close', (signal) => {
  console.log(`child process terminated due to receipt of signal ${signal}`)
})

function done() {
  tests.run++
  if (tests.run === tests.toRun) {
    console.log(`
      ==============================
      Test results:
      ------------------------------
      Number of Tests:   ${tests.toRun}
      Tests Run:         ${tests.run}
      Tests Passed:      ${tests.pass}
      Tests Failed:      ${tests.fail}
      ==============================
    `)
    server.kill()
  }
}

function onError(e) {
  console.log(`Problem with request: ${e.message}`);
  tests.fail++
  done()
}

function onSuccess(res) {
  console.log(`STATUS: ${res.statusCode}`);
  // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    // console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    tests.pass++
    done()
  })
}

function request(path = '/', success = onSuccess, failure = onError) {
  let request = Object.assign({}, requestOptions, { path: encodeURI(path) })
  http.request(request, success).on('error', failure).end();
  tests.toRun++;
}

request()
request("/<script>alert('Leet Hax!')</script>")
