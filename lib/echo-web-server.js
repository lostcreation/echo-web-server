'use strict';

var http = require('http');
var hostname = process.env['ECHO_WEB_SERVER_HOST'] || '0.0.0.0';
var port = process.env['ECHO_WEB_SERVER_PORT'] || '8080';

var server = http.createServer(function (req, res) {
  var url = decodeURI(req.url);
  var HTMLTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>\n      #sent, #received {\n        margin-left: 2.5em;\n        font-family: monospace;\n      }\n    </style>\n    <script>\n      window.onload = function () {\n        document.getElementById("sent").innerHTML = decodeURI(document.URL)\n      }\n    </script>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <div id="sent"></div>\n    <p>I received the request:</p>\n    <div id="received">http://' + hostname + ':' + port + url + '</div>\n  </body>\n</html>\n'; // END HTMLTemplateString

  console.log('Client [' + req.connection.remoteAddress + '] Requested: ' + url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache');
  res.end(HTMLTemplateString);
});

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});