'use strict'

const test = require('blue-tape')
const moduleId = '../../../src/loggers/to-console.js'
const toConsole = require(moduleId)

test('to-console module should exist.', (t) => {
  t.throws(() => require.resolve('badpath'),
    'require.resolve should throw given a bad path.')
  t.doesNotThrow(() => require.resolve(moduleId),
    `toConsole should exist at path ${moduleId}.`)
  t.equal(typeof toConsole, 'function',
    'toConsole should be a function.')
  t.end()
})
