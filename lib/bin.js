#!/usr/bin/env node
'use strict';

var argv = process.argv.splice(2);

// ENV defaults
var host = getValueForFlag('-h', argv) || process.env['ECHO_WEB_SERVER_HOST'];
var port = getValueForFlag('-p', argv) || process.env['ECHO_WEB_SERVER_PORT'];

// Our server
var server = require('./echo-web-server.js');

// Start the server, storing the function returned by the `start` method so we
// can gracefully shut downt he server later.
var stop = server.start({ port: port, host: host, ready: function ready(_ref) {
    var host = _ref.host;
    var port = _ref.port;

    console.log('Server running at http://' + host + ':' + port + '/');
  } });

// We'll use the server's addLogger method to give us a way to gracefully
// shutdown the server. This would be a bad idea in a real application, but
// it's safe enough for testing.
server.addLogger(function (_ref2) {
  var host = _ref2.host;
  var port = _ref2.port;
  var url = _ref2.url;

  if (url === '/stop/stop/stop') {
    stop(function () {
      console.log('[' + host + ':' + port + '] Recieved shutdown request "/stop/stop/stop"');
      console.log('[' + host + ':' + port + '] The Server will shut down!');
    });
  }
});

// Quick helper function to find any specific command line flags the user may
// have passed in.
function getValueForFlag(flag, args) {
  var i = args.indexOf(flag);
  if (i === -1) return undefined;
  return args[i + 1];
}
//# sourceMappingURL=bin.js.map