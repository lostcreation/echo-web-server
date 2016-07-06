module.exports = asHTML

/**
 * Properly escapes HTML tags and special characters to prevent mischief.
 * @param {string} str - A string that we don't want to contain any HTML.
 * @return {string} - A string that no longer contains any HTML.
 */
function escapeHTML (str) {
  return  [ [/&/g, '&amp;']
          , [/>/g, '&gt;']
          , [/</g, '&lt;']
          , [/"/g, '&quot;']
          , [/'/g, '&#39;']
          , [/\`/g, '&#96;']
          ].reduce((p, c) => p.replace(...c), str)
}

/**
 * Renders HTML summary of the request for the client.
 * @param {Object} requestInfo       - Logging info for the the request.
 * @param {string} requestInfo.host  - Servers host or IP address.
 * @param {string} requestInfo.port  - Port the server is listening on.
 * @param {string} requestInfo.url   - The path requested by the client.
 * @param {object} requestInfo.res   - The server response object that will recieve the HTML.
 */
function asHTML ({ host, port, url, res }) {
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
    <pre id="received">${escapeHTML(`http://${host}:${port}${url}`)}</pre>
  </body>
</html>
` // END HTMLTemplateString

  // Send HTML to client
  res.setHeader('Content-Type', 'text/html')
  res.write(HTMLTemplateString)
}
