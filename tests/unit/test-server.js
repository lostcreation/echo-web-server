'use strict'

const moduleID = '../../src/echo-web-server.js'

const test = require('blue-tape')
const echo = require(moduleID)

test('Echo web server factory.', (t) => {
  t.ok(require.resolve(moduleID),
    'Our module ID should resolve to file a path.')
  t.ok(echo,
    'Our module should exist.')

  t.test('Testing module methods...', (t) => {
    ;['start'].forEach((method) => {
      t.equal(typeof echo[method], 'function',
        `It should have the method "${method}".`)
    })

    ;['addLogger', 'toConsole', 'asHTML'].forEach((method) => {
      t.equal(echo[method], undefined,
        `It should NOT have the method "${method}".`)
    })
    t.end()
  })
  t.end()
})

test('Testing server start method.', (t) => {
  const server = echo.start({ ready (reqInfo) {
    t.test('Server ready callback...', (t) => {
      t.pass('Server should be ready.')
      t.end()
    })
    t.equal(typeof server.stop, 'function',
      'Stop method should exist.')
    t.equal(typeof server.addLogger, 'function',
      'addLogger method should exist.')

    t.test('Server stop method...', (t) => {
      server.stop(() => {
        t.pass('Server should stop')
        t.end()
      })
    })
    t.end()
  }})
})
