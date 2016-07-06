console.log(`Current directory: ${process.cwd()}`);

const test   = require('blue-tape')
const asHTML = require('../../../src/loggers/asHTML.js')


function stubRes() {
  return  { headers : {}
          , body : ''
          , setHeader (header, value) {
              this.headers[header] = value
            }
          , write (str) {
              this.body = this.body + str
            }
          }
}

test('Wellformed Request', (t) => {
  const res = stubRes()
  const req = { host: "test"
              , port: "80"
              , url: "/first-test"
              , res
              }
  asHTML(req)
  t.equal(res.headers['Content-Type']
    , 'text/html'
    , 'Should have Content-Type "text/html".'
    )
  t.notEqual(res.body.indexOf(`http://${req.host}:${req.port}${req.url}`)
    , -1
    , `'Should contain the requested URL in res.body.'

${res.body}

`
    )
  t.end()
})

test('Attempt to inject HTML', (t) => {
  const res = stubRes()
  const url = `/<script>alert("Leet Hax!")</script>`
  asHTML({ host: "test"
         , port: "80"
         , url: url
         , res
         })
  t.notEqual(res.body.indexOf("&lt;script&gt;alert(&quot;Leet Hax!&quot;)&lt;/script&gt;")
    , -1
    , 'Should escape HTML in the url.')
  t.end()
})
