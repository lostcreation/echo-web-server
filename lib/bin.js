'use strict';

// ENV defaults
var host = process.env['ECHO_WEB_SERVER_HOST'];
var port = process.env['ECHO_WEB_SERVER_PORT'];

// Our server
var server = require('./echo-web-server.js');

// Start the server using our defaults.
var stop = server.start(port, host, function (_ref) {
  var host = _ref.host;
  var port = _ref.port;

  console.log('Server running at http://' + host + ':' + port + '/');
});

server.addLogger(function (_ref2) {
  var host = _ref2.host;
  var port = _ref2.port;
  var url = _ref2.url;

  if (url === '/stop/stop/stop') {
    stop(function () {
      console.log('[' + host + ':' + port + '] Recieved shutdown request "/stop/stop/stop"');
      console.log('[' + host + ':' + port + '] The Server will shot down!');
    });
  }
});
//# sourceMappingURL=bin.js.map