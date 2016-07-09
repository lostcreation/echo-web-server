'use strict'

const test = require('blue-tape')
const asHTML = require('../../../src/loggers/as-html.js')

runTest('Testing safe request URI.',
  '/safe-test',
  '/safe-test',
  'Safe request URI should appear as-is inside "received" tag.')

runTest('Testing unsafe request URI.',
  '/<script>alert("Leet Hax!")</script>',
  '/&lt;script&gt;alert(&quot;Leet Hax!&quot;)&lt;/script&gt;',
  'Unsafe request URI should be escaped.')

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
    const start = openingTagLocation + openingTag.length

    const closingTag = '</pre>'
    const closingTagLocation =
      openingTagLocation === -1 ? -1 : body.indexOf(closingTag, start)
    const end = closingTagLocation

    t.test('Testing Response Headers.', (t) => {
      t.equal(response.headers['Content-Type'],
        'text/html',
        'response "Content-Type" header should be "text/html".')
      t.end()
    })

    t.test('Testing Response Body.', (t) => {
      t.equal(typeof body, 'string',
        '`response.body` should be a string.')
      t.notEqual(body, '',
        '`response.body` should NOT be an empty string.')
      t.notEqual(openingTagLocation, -1,
        `The opening tag \`${openingTag}\` should have a nonnegative index.`)
      t.equal((closingTagLocation === -1), false,
        `The closing tag \`${closingTag}\` should follow the opening tag.`)
      t.equal(body.substring(start, end).trim(),
        `http://${request.host}:${request.port}${outputPath}`,
        message)
      t.end()
    })

    t.end()
  })
}
