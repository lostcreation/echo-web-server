'use strict'

const moduleId = '../../../src/echo-web-server.js'

const test = require('blue-tape')
const echo = require(moduleId)

test('Testing echo-web-server module.', (t) => {
  t.test('Test module loading...', (t) => {
    t.throws(() => require.resolve('badpath'),
      'require.resolve should throw given a bad path.')
    t.doesNotThrow(() => require.resolve(moduleId),
      `ews should exist at path ${moduleId}.`)
    t.ok(echo,
      'ews should exist')
    t.end()
  })

  t.test('Test module methods...', (t) => {
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
  t.end()
})
