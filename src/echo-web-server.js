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
      #sent, #recieved {
        margin-left: 2.5em;
        font-family: monospace;
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
    <div id="sent"></div>
    <p>I recieved the request:</p>
    <div id="recieved">http://${hostname}:${port}${url}</div>
  </body>
</html>
` // END HTMLTemplateString

  console.log(`Client Requested: ${url}`)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(HTMLTemplateString)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
