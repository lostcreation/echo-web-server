// ENV
const hostName = process.env['ECHO_WEB_SERVER_HOST'] || '0.0.0.0'
const port     = process.env['ECHO_WEB_SERVER_PORT'] || '8080'

// Dependencies
const http    =   require('http')
const loggers = [ require("./loggers/to-console.js")
                , require("./loggers/to-parent-process.js")
                , require("./loggers/as-html.js")
                ]

// Server
const server = http.createServer((req, res) => {
  const requestInfo = Object.freeze({ hostName, port, res
                                    , client : req.connection.remoteAddress
                                    , url    : decodeURI(req.url)
                                    })
  res.statusCode = 404
  res.setHeader('Cache-Control', 'no-cache')
  loggers.forEach((log) => log(requestInfo))
  res.end()
})

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}/`)
  process.send && process.send({ hostName, port })
})
