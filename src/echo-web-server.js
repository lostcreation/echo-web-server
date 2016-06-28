const http     = require('http')
const hostname = process.env['ECHO_WEB_SERVER_HOST'] || '0.0.0.0'
const port     = process.env['ECHO_WEB_SERVER_PORT'] || '8080'

function escapeHTML (str) {
  return [ [/&/g, '&amp;']
         , [/>/g, '&gt;']
         , [/</g, '&lt;']
         , [/"/g, '&quot;']
         , [/'/g, '&#39;']
         , [/'/g, '&#39;']
         , [/\`/g, '&#96;']
         ].reduce((p, c) => p.replace(...c), str)
}

const server = http.createServer((req, res) => {
  const url = decodeURI(req.url)
  const HTMLTemplateString = `<!DOCTYPE html>
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
      window.addEventListener("load", function (event) {
        document.getElementById("sent").textContent = decodeURI(document.URL)
      });
    </script>
  </head>
  <body>
    <p>You sent the request:</p>
    <pre id="sent"></pre>
    <p>I saw the request:</p>
    <pre id="received">${escapeHTML(`http://${hostname}:${port}${url}`)}</pre>
  </body>
</html>
` // END HTMLTemplateString

  console.log(`Client [${req.connection.remoteAddress}] Requested: ${url}`)
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'no-cache')
  res.end(HTMLTemplateString)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
