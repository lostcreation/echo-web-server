'use strict';

var http = require('http');
var hostname = process.env['ECHO_WEB_SERVER_HOST'] || '127.0.0.1';
var port = process.env['ECHO_WEB_SERVER_PORT'] || '8080';

var server = http.createServer(function (req, res) {
  var html = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>' + req.url + '</title>\n    <style>\n      pre {\n        margin-left: 2.5em;\n      }\n    </style>\n  </head>\n  <body>\n    <p>I heard the request:</p>\n    <pre>http://' + hostname + ':' + port + req.url + '</pre>\n  </body>\n</html>\n';
  console.log('User Requst: ' + req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});