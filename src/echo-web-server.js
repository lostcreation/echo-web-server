const http     = require('http')
const hostname = process.env['ECHO_WEB_SERVER_HOST'] || '0.0.0.0'
const port     = process.env['ECHO_WEB_SERVER_PORT'] || '8080'

const server = http.createServer((req, res) => {
  const url = decodeURI(req.url)
  const HTMLTemplateString =
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Echo Web Server</title>
    <style>
      #sent, #received {
        margin-left: 2.5em;
      }
    </style>
    <script>
      window.onload = function () {
        document.getElementById("sent").innerHTML = decodeURI(document.URL)
      }
    </script>
  </head>
  <body>
    <p>You sent the request:</p>
    <pre id="sent"></pre>
    <p>I received the request:</p>
    <pre id="received">http://${hostname}:${port}${url}</pre>
  </body>
</html>
` // END HTMLTemplateString

  console.log(`Client [${req.connection.remoteAddress}] Requested: ${url}`)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'no-cache')
  res.end(HTMLTemplateString)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
