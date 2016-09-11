const moduleId = '../../../src/echo-web-server.js'
const test = require('blue-tape')

test('Module Path', (t) => {
  t.throws(() => require.resolve('badpath'),
    'require.resolve should throw given a bad path.')
  t.doesNotThrow(() => require.resolve(moduleId),
    `Module should exist at path ${moduleId}.`)
  t.end()
})

const echo = require(moduleId)

test('Module Methods', (t) => {
  t.ok(echo,
    'ews should exist')
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

module.exports = echo
