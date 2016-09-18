'use strict'

module.exports = asHTML

const escapeHTML = require('../utils/escape-html.js')

function asHTML ({ req, host, port, url, res }) {
  const hostSawRequest = escapeHTML(`http://${host}:${port}${url}`)
  const clientRequested = escapeHTML(`http://${req.headers.host}${url}`)
  const htmlTemplateString = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Echo Web Server</title>
    <style>pre { margin-left: 2.5em; }</style>
  </head>
  <body>
    <p>You sent the request:</p>
    <pre>${clientRequested}</pre>
    <p>I saw the request:</p>
    <pre>${hostSawRequest}</pre>
  </body>
</html>
` // END HTMLTemplateString

  res.setHeader('Content-Type', 'text/html')
  res.write(htmlTemplateString)
}
