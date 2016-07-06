'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Dependencies
var http = require('http');

// Default Loggers
var loggers = [];
addLogger(toConsole);
addLogger(asHTML);

// Exports
module.exports = { start: start,
  toConsole: toConsole,
  asHTML: asHTML,
  addLogger: addLogger
};

// Server =====================================================================

/**
 * Starts a server at the port and host indicated.
 * @param {string} [port='8080'] - Open port or 'auto' to assign a random free port.
 * @param {string} [host='0.0.0.0'] - IP or host name
 * @returns {function} - Stop this server then execute an optional callback function.
 */
function start() {
  var port = arguments.length <= 0 || arguments[0] === undefined ? '8080' : arguments[0];
  var host = arguments.length <= 1 || arguments[1] === undefined ? '0.0.0.0' : arguments[1];
  var callback = arguments[2];

  // Handle special case for an auto-port.
  if (port === 'auto') port = 0;

  // Create the server we're starting.
  var server = http.createServer(function (req, res) {
    var requestInfo = Object.freeze({ res: res, host: host, port: port,
      client: req.connection.remoteAddress,
      url: decodeURI(req.url)
    });
    res.statusCode = 404;
    res.setHeader('Cache-Control', 'no-cache');
    loggers.forEach(function (log) {
      return log(requestInfo);
    });
    res.end();
  });

  server.listen(port, host, function () {
    host = server.address().address;
    port = server.address().port;
    callback && callback({ host: host, port: port, running: true });
  });

  return function (callback) {
    process.disconnect && process.disconnect();
    server.listening && server.close(callback);
  };
}

/**
 * Adds a logging function that will automatically be notified of new
 * requests.
 */
function addLogger(logger) {
  loggers.push(logger);
}

// Loggers ====================================================================

/**
 * Logs request information to the console.
 * @param {Object} requestInfo        - Logging info for the the request.
 * @param {string} requestInfo.client - The IP address for the client.
 * @param {string} requestInfo.url    - The path requested by the client.
 */
function toConsole(_ref) {
  var client = _ref.client;
  var url = _ref.url;

  console.log('Client [' + client + '] Requested: ' + url);
}

/**
 * Renders HTML summary of the request for the client.
 * @param {Object} requestInfo       - Logging info for the the request.
 * @param {string} requestInfo.host  - Servers host or IP address.
 * @param {string} requestInfo.port  - Port the server is listening on.
 * @param {string} requestInfo.url   - The path requested by the client.
 * @param {object} requestInfo.res   - The server response object that will recieve the HTML.
 */
function asHTML(_ref2) {
  var host = _ref2.host;
  var port = _ref2.port;
  var url = _ref2.url;
  var res = _ref2.res;

  var escapeHTML = function escapeHTML(str) {
    return [[/&/g, '&amp;'], [/>/g, '&gt;'], [/</g, '&lt;'], [/"/g, '&quot;'], [/'/g, '&#39;'], [/\`/g, '&#96;']].reduce(function (p, c) {
      return p.replace.apply(p, _toConsumableArray(c));
    }, str);
  };

  var HTMLTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>\n      #sent, #received {\n        margin-left: 2.5em;\n      }\n    </style>\n    <script>\n      window.addEventListener("load", function (event) {\n        document.getElementById("sent").textContent = decodeURI(document.URL)\n      });\n    </script>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <pre id="sent"></pre>\n    <p>I saw the request:</p>\n    <pre id="received">' + escapeHTML('http://' + host + ':' + port + url) + '</pre>\n  </body>\n</html>\n'; // END HTMLTemplateString

  // Send HTML to client
  res.setHeader('Content-Type', 'text/html');
  res.write(HTMLTemplateString);
}
//# sourceMappingURL=echo-web-server.js.map