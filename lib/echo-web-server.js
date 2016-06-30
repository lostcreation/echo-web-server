'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var http = require('http');
var hostname = process.env['ECHO_WEB_SERVER_HOST'] || '0.0.0.0';
var port = process.env['ECHO_WEB_SERVER_PORT'] || '8080';

function escapeHTML(str) {
  return [[/&/g, '&amp;'], [/>/g, '&gt;'], [/</g, '&lt;'], [/"/g, '&quot;'], [/'/g, '&#39;'], [/'/g, '&#39;'], [/\`/g, '&#96;']].reduce(function (p, c) {
    return p.replace.apply(p, _toConsumableArray(c));
  }, str);
}

var server = http.createServer(function (req, res) {
  var url = decodeURI(req.url);
  var client = req.connection.remoteAddress;
  var HTMLTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>\n      #sent, #received {\n        margin-left: 2.5em;\n      }\n    </style>\n    <script>\n      window.addEventListener("load", function (event) {\n        document.getElementById("sent").textContent = decodeURI(document.URL)\n      });\n    </script>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <pre id="sent"></pre>\n    <p>I saw the request:</p>\n    <pre id="received">' + escapeHTML('http://' + hostname + ':' + port + url) + '</pre>\n  </body>\n</html>\n'; // END HTMLTemplateString

  // Log client request
  console.log('Client [' + client + '] Requested: ' + url);
  process.send && process.send({ client: client, url: url });

  // Send response
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache');
  res.end(HTMLTemplateString);
});

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
  process.send && process.send({ 'ready': true });
});