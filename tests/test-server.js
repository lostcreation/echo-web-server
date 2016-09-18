'use strict'

const test = require('blue-tape')
const http = require('http')

test(`Testing Echo-Web-Server`, (t) => {
  t.plan(3)
  http.get('http://localhost:8080/test', (res) => {
    const body = []
    res.on('data', function (data) {
      body.push(data)
    })
    res.on('end', () => {
      console.log(body.join('\n'))
    })
    t.equal(res.statusCode, 404, 'Response statusCode should be "404".')
    t.equal(res.headers['content-type'], 'text/html', 'Response should be type "text/html".')
    res.resume()
  }).on('error', (e) => {
    t.fail(`Got error: ${e.message}`)
  })
})

// const server = require('../src/server.js')
// function request (path = '/test', port = 8080, hostname = 'localhost') {
//   return new Promise((resolve, reject) => {
//     var options = { hostname, port, path }
//     var req = http.request(options, (res) => {
//       const data = []
//       res.setEncoding('utf8')
//       res.on('data', (chunk) => {
//         data.push(chunk)
//       })
//       res.on('end', () => {
//         console.log(data)
//         resolve(`Received all data from server.`)
//       })
//     })
//     req.on('error', (e) => {
//       reject(`problem with request: ${e.message}`)
//     })
//     req.end()
//   })
// }

// test('Testing Echo Web Server ...', (t) => {
//   // t.plan(9)
//   // t.equal('start' in server, true, 'The server should have a start method')

//   // const { addLogger, stop } = server.start(undefined, undefined, (s) => {
//   //   t.equal(s.running, true, 'Our server should now be running.')
//   //   t.equal(s.host, '0.0.0.0', 'The default host is "0.0.0.0".')
//   //   t.equal(s.port, 8080, 'The default port is "8080".')
//   //   t.equal(typeof addLogger, 'function', 'Return "addLogger" should be a function.')
//   //   t.equal(typeof stop, 'function', 'Return "stop" should be a function.')
//   //   addLogger((requestInfo) => {
//   //     t.pass('Logger should be called when a request is made.')
//   //   })
//   //   request()
//   //   .then((msg) => {
//   //     t.pass(msg)
//   //     stop(() => {
//   //       t.pass('The server sould now be stopped.')
//   //     })
//   //   })
//   //   .catch((msg) => {
//   //     t.fail(msg)
//   //   })
//   // })
// })
