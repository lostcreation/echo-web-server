'use strict';

// Dependencies
var http = require('http');
var asHTML = require('./loggers/as-html');
var toConsole = require('./loggers/to-console');

// Exports
module.exports = {
  start: start
};

/**
 * Starts a server at the port and host indicated.
 * @param {object}   options
 * @param {string}   [options.port='8080']    - Open port or 'auto' to assign a random free port.
 * @param {string}   [options.host='0.0.0.0'] - IP or host name
 * @param {function} [options.ready]          - Callback executed when server is ready to accept incoming connections.
 * @returns {object} [server]                 - Stop this server then execute an optional callback function.
 */
function start() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$port = _ref.port;
  var port = _ref$port === undefined ? '8080' : _ref$port;
  var _ref$host = _ref.host;
  var host = _ref$host === undefined ? '0.0.0.0' : _ref$host;
  var ready = _ref.ready;

  // Handle special case for an auto-port.
  if (port === 'auto') port = 0;

  // Default Loggers
  var loggers = [toConsole, asHTML];

  // Create the server we're starting.
  var server = http.createServer(function (req, res) {
    var requestInfo = Object.freeze({ res: res, host: host, port: port,
      client: req.connection.remoteAddress,
      url: decodeURI(req.url)
    });
    res.statusCode = 404;
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'close');
    loggers.forEach(function (log) {
      return log(requestInfo);
    });
    res.end();
  });

  server.listen(port, host, function () {
    host = server.address().address;
    port = server.address().port;
    ready && ready({ host: host, port: port, running: true });
  });

  return {
    stop: function stop(callback) {
      process.disconnect && process.disconnect();
      server.listening && server.close(callback);
    },
    addLogger: function addLogger(logger) {
      loggers.push(logger);
    }
  };
}
//# sourceMappingURL=echo-web-server.js.map