'use strict';

// Dependencies
var http = require('http');
var asHTML = require('./loggers/asHTML.js');

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
//# sourceMappingURL=echo-web-server.js.map