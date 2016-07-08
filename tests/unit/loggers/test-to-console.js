const test = require('blue-tape')
const toConsole = require('../../../src/loggers/to-console.js')

test('the to-console module should exist.', (t) => {
  t.equal(typeof toConsole, 'function', (t) => {
    'Module `toConsole` should be a function.'
  })
  t.end()
})
