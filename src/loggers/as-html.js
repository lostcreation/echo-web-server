module.exports = ({ hostName, port, url, res }) => {
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
    <pre id="received">${escapeHTML(`http://${hostName}:${port}${url}`)}</pre>
  </body>
</html>
` // END HTMLTemplateString

  // Send HTML to client
  res.setHeader('Content-Type', 'text/html')
  res.write(HTMLTemplateString)
}

function escapeHTML (str) {
  return [ [/&/g, '&amp;']
         , [/>/g, '&gt;']
         , [/</g, '&lt;']
         , [/"/g, '&quot;']
         , [/'/g, '&#39;']
         , [/\`/g, '&#96;']
         ].reduce((p, c) => p.replace(...c), str)
}
