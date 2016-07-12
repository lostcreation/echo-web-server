'use strict'

const test = require('blue-tape')
const module = require(require('./test-module').id)

test('test-server.js tests running', (t) => {
  t.test('Test module methods...', (t) => {
    t.ok(module,
      'ews should exist')
    ;['start'].forEach((method) => {
      t.equal(typeof module[method], 'function',
        `It should have the method "${method}".`)
    })

    ;['addLogger', 'toConsole', 'asHTML'].forEach((method) => {
      t.equal(module[method], undefined,
        `It should NOT have the method "${method}".`)
    })
    t.end()
  })

  t.test('Testing server start method.', (t) => {
    const server = module.start({ ready (reqInfo) {
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
