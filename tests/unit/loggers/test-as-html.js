'use strict'

const test = require('blue-tape')
const asHTML = require('../../../src/loggers/as-html.js')

runTest('Testing safe request URI.',
  '/safe-test',
  '/safe-test',
  'Should contain the URL inside a response tag.')

runTest('Testing unsafe request URI.',
  '/<script>alert("Leet Hax!")</script>',
  '/&lt;script&gt;alert(&quot;Leet Hax!&quot;)&lt;/script&gt;',
  'Should escape HTML in the url.')

function runTest (title, inputPath, outputPath, message) {
  const response = { headers: {},
    body: '',
    setHeader (header, value) {
      this.headers[header] = value
    },
    write (str) {
      this.body = this.body + str
    }
  }
  const request = { host: 'mock-host',
    port: '80',
    url: inputPath,
    res: response
  }

  // Build the HTML page response from our request.
  asHTML(request)

  // Test the response for required outputs.
  test(title, (t) => {
    const body = response.body
    const openingTag = '<pre id="received">'
    const openingTagLocation = body.indexOf(openingTag)
    const closingTag = '</pre>'
    const closingTagLocation = openingTagLocation === -1 ? -1 : body.indexOf(closingTag, openingTagLocation)
    const start = openingTagLocation + openingTag.length
    const end = closingTagLocation

    t.equal(response.headers['Content-Type'],
      'text/html',
      'response "Content-Type" header should be "text/html".')

    t.test('... testing response.body', (t) => {
      t.equal((body === undefined), false,
        'response.body should not be undefined.')
      t.equal((body === ''), false,
        'response.body should not be an empty string.')
      t.equal((openingTagLocation === -1), false,
        `response.body should have the opening tag ${openingTag}.`)
      t.equal((closingTagLocation === -1), false,
        `The closing tag "${closingTag}" should follow the opening tag.`)
      t.end()
    })

    t.test('... testing URI Parsing', (t) => {
      t.equal(body.substring(start, end).trim(),
        `http://${request.host}:${request.port}${outputPath}`,
        message)
      t.end()
    })
    t.end()
  })
}
