const test = require('blue-tape')
const toConsole = require('../../../src/loggers/to-console.js')

test('Testing "toConsole" logger ... ', (t) => {
  t.equal(typeof toConsole, 'function', (t) => {
    'toConsole should be a function.'
  })
  t.end()
})
