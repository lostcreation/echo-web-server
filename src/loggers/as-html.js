'use strict'

const escapeHTML = require('../utils/escape-html.js')

module.exports = ({ host, port, url, res } = {
  host: '0.0.0.0',
  port: 0,
  url: '/',
  res: undefined
}) => {
  const htmlTemplateString = `<!DOCTYPE html>
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
    <pre id="received">${escapeHTML(`http://${host}:${port}${url}`)}</pre>
  </body>
</html>
` // END htmlTemplateString

  res.setHeader('Content-Type', 'text/html')
  res.write(htmlTemplateString)
}
