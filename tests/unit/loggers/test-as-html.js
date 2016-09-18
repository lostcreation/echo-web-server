'use strict'

const test = require('blue-tape')
const asHTML = require('../../../src/loggers/as-html.js')

runTest('Testing "asHTML" logger with a safe request URI ... ',
  '/safe-test',
  '/safe-test',
  'Safe request URI should appear as-is inside "received" tag.')

runTest('Testing "asHTML" logger with an unsafe request URI ... ',
  '/<script>alert("Leet Hax!")</script>',
  '/&lt;script&gt;alert(&quot;Leet Hax!&quot;)&lt;/script&gt;',
  'Unsafe request URI should be escaped.')

function runTest (title, inputPath, outputPath, message) {
  const mockResponse = {
    headers: {},
    body: '',
    setHeader (header, value) {
      this.headers[header] = value
    },
    write (str) {
      this.body = this.body + str
    }
  }
  const mockRequest = {
    host: 'mock-host',
    port: '8080',
    url: inputPath,
    res: mockResponse,
    req: {
      headers: {
        host: 'mock-host:8080'
      }
    }
  }

  // Build the HTML page response from our request.
  asHTML(mockRequest)

  // Test the response for required outputs.
  test(title, (t) => {
    const body = mockResponse.body

    const sentAsTag = `<pre id="sent">http://${mockRequest.host}:${mockRequest.port}${outputPath}</pre>`
    const receivedAsTag = `<pre id="received">http://${mockRequest.host}:${mockRequest.port}${outputPath}</pre>`
    t.equal(mockResponse.headers['Content-Type'],
      'text/html',
      'response "Content-Type" header should be "text/html".')
    t.equal(typeof body, 'string',
      '`response.body` should be a string.')
    t.notEqual(body, '',
      '`response.body` should NOT be an empty string.')
    t.notEqual(body.indexOf(sentAsTag), -1,
      `Body should contain the tag#sent: ${sentAsTag}`)
    t.notEqual(body.indexOf(sentAsTag), -1,
      `Body should contain the tag#received: ${receivedAsTag}`)
    t.pass(message)
    t.end()
  })
}
