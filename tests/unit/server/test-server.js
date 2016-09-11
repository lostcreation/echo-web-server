'use strict'

const test = require('blue-tape')
const echo = require('./test-module')

test('test-server.js tests running', (t) => {

  t.test('Testing server start method.', (t) => {
    const server = echo.start({ ready (reqInfo) {
      t.pass('Server should start.')
      t.equal(typeof server.stop, 'function',
        'Stop method should exist.')
      t.equal(typeof server.addLogger, 'function',
        'addLogger method should exist.')
      server.stop(() => {
        t.pass('Server should stop')
        t.end()
      })
    }})
  })

  t.test('Running multiple servers.', (t) => {
    function startServer (port = 0) {
      const s = {
        server: echo.start({ port, ready () { s.ready = true } }),
        ready: false,
        responded: 0
      }
      s.server.addLogger(() => { s.responded++ })
      return s
    }
    const s1 = startServer('3000')
    const s2 = startServer('4000')

  })
  t.end()
})
