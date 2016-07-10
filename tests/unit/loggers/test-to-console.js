'use strict'

const test = require('blue-tape')
const toConsole = require('../../../src/loggers/to-console.js')

test('to-console module should exist.', (t) => {
  t.equal(typeof toConsole, 'function',
    'toConsole should be a function.')
  t.end()
})
