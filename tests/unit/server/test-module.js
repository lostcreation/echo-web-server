const moduleId = '../../../src/echo-web-server.js'
const test = require('blue-tape')

test('Module Path', (t) => {
  t.throws(() => require.resolve('badpath'),
    'require.resolve should throw given a bad path.')
  t.doesNotThrow(() => require.resolve(moduleId),
    `Module should exist at path ${moduleId}.`)
  t.end()
})

module.exports = {
  id: moduleId
}
