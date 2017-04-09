// #!/usr/bin/env node

'use strict';
// Dependencies

var server = require('./echo-web-server.js');
var logAsHTML = require('./loggers/as-html');
var logToConsole = require('./loggers/to-console');

var argv = process.argv.splice(2);

// ENV defaults
var host = getValueForFlag('-h', argv) || process.env['ECHO_WEB_SERVER_HOST'] || undefined;
var port = getValueForFlag('-p', argv) || process.env['ECHO_WEB_SERVER_PORT'] || undefined;

// Start the server.

var _server$start = server.start(host, port, function (_ref) {
  var host = _ref.host,
      port = _ref.port;

  console.log('[EWS] New server running at http://' + host + ':' + port + '/');
}),
    stop = _server$start.stop,
    addLogger = _server$start.addLogger;

addLogger(logAsHTML, logToConsole);

// Create a new logger that gives us a way to gracefully shutdown the server
// when given a "secret" url. This would be a bad idea in a real application,
// but it's safe enough for testing.
addLogger(function (_ref2) {
  var host = _ref2.host,
      port = _ref2.port,
      url = _ref2.url;

  if (url === '/stop/stop/stop') {
    console.log('[EWS] ' + host + ':' + port + ': Received shutdown request "/stop/stop/stop"');
    stop(console.log.bind(console.log, '[EWS] ' + host + ':' + port + ': Is shutting down!'));
  }
});

// Quick helper function to find any specific command line flags the user may
// have passed in.
function getValueForFlag(flag, args) {
  var i = args.indexOf(flag);
  if (i === -1) return undefined;
  return args[i + 1];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4uanMiXSwibmFtZXMiOlsic2VydmVyIiwicmVxdWlyZSIsImxvZ0FzSFRNTCIsImxvZ1RvQ29uc29sZSIsImFyZ3YiLCJwcm9jZXNzIiwic3BsaWNlIiwiaG9zdCIsImdldFZhbHVlRm9yRmxhZyIsImVudiIsInVuZGVmaW5lZCIsInBvcnQiLCJzdGFydCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiYWRkTG9nZ2VyIiwidXJsIiwiYmluZCIsImZsYWciLCJhcmdzIiwiaSIsImluZGV4T2YiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7O0FBQ0EsSUFBTUEsU0FBU0MsUUFBUSxzQkFBUixDQUFmO0FBQ0EsSUFBTUMsWUFBWUQsUUFBUSxtQkFBUixDQUFsQjtBQUNBLElBQU1FLGVBQWVGLFFBQVEsc0JBQVIsQ0FBckI7O0FBRUEsSUFBTUcsT0FBT0MsUUFBUUQsSUFBUixDQUFhRSxNQUFiLENBQW9CLENBQXBCLENBQWI7O0FBRUE7QUFDQSxJQUFNQyxPQUFPQyxnQkFBZ0IsSUFBaEIsRUFBc0JKLElBQXRCLEtBQStCQyxRQUFRSSxHQUFSLENBQVksc0JBQVosQ0FBL0IsSUFBc0VDLFNBQW5GO0FBQ0EsSUFBTUMsT0FBT0gsZ0JBQWdCLElBQWhCLEVBQXNCSixJQUF0QixLQUErQkMsUUFBUUksR0FBUixDQUFZLHNCQUFaLENBQS9CLElBQXNFQyxTQUFuRjs7QUFFQTs7b0JBQzRCVixPQUFPWSxLQUFQLENBQWFMLElBQWIsRUFBbUJJLElBQW5CLEVBQXlCLGdCQUFrQjtBQUFBLE1BQWhCSixJQUFnQixRQUFoQkEsSUFBZ0I7QUFBQSxNQUFWSSxJQUFVLFFBQVZBLElBQVU7O0FBQ3JFRSxVQUFRQyxHQUFSLHlDQUFrRFAsSUFBbEQsU0FBMERJLElBQTFEO0FBQ0QsQ0FGMkIsQztJQUFwQkksSSxpQkFBQUEsSTtJQUFNQyxTLGlCQUFBQSxTOztBQUlkQSxVQUFVZCxTQUFWLEVBQXFCQyxZQUFyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQWEsVUFBVSxpQkFBdUI7QUFBQSxNQUFyQlQsSUFBcUIsU0FBckJBLElBQXFCO0FBQUEsTUFBZkksSUFBZSxTQUFmQSxJQUFlO0FBQUEsTUFBVE0sR0FBUyxTQUFUQSxHQUFTOztBQUMvQixNQUFJQSxRQUFRLGlCQUFaLEVBQStCO0FBQzdCSixZQUFRQyxHQUFSLFlBQXFCUCxJQUFyQixTQUE2QkksSUFBN0I7QUFDQUksU0FBS0YsUUFBUUMsR0FBUixDQUFZSSxJQUFaLENBQWlCTCxRQUFRQyxHQUF6QixhQUF1Q1AsSUFBdkMsU0FBK0NJLElBQS9DLHlCQUFMO0FBQ0Q7QUFDRixDQUxEOztBQU9BO0FBQ0E7QUFDQSxTQUFTSCxlQUFULENBQTBCVyxJQUExQixFQUFnQ0MsSUFBaEMsRUFBc0M7QUFDcEMsTUFBTUMsSUFBSUQsS0FBS0UsT0FBTCxDQUFhSCxJQUFiLENBQVY7QUFDQSxNQUFJRSxNQUFNLENBQUMsQ0FBWCxFQUFjLE9BQU9YLFNBQVA7QUFDZCxTQUFPVSxLQUFLQyxJQUFJLENBQVQsQ0FBUDtBQUNEIiwiZmlsZSI6ImJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICMhL3Vzci9iaW4vZW52IG5vZGVcblxuJ3VzZSBzdHJpY3QnXG4vLyBEZXBlbmRlbmNpZXNcbmNvbnN0IHNlcnZlciA9IHJlcXVpcmUoJy4vZWNoby13ZWItc2VydmVyLmpzJylcbmNvbnN0IGxvZ0FzSFRNTCA9IHJlcXVpcmUoJy4vbG9nZ2Vycy9hcy1odG1sJylcbmNvbnN0IGxvZ1RvQ29uc29sZSA9IHJlcXVpcmUoJy4vbG9nZ2Vycy90by1jb25zb2xlJylcblxuY29uc3QgYXJndiA9IHByb2Nlc3MuYXJndi5zcGxpY2UoMilcblxuLy8gRU5WIGRlZmF1bHRzXG5jb25zdCBob3N0ID0gZ2V0VmFsdWVGb3JGbGFnKCctaCcsIGFyZ3YpIHx8IHByb2Nlc3MuZW52WydFQ0hPX1dFQl9TRVJWRVJfSE9TVCddIHx8IHVuZGVmaW5lZFxuY29uc3QgcG9ydCA9IGdldFZhbHVlRm9yRmxhZygnLXAnLCBhcmd2KSB8fCBwcm9jZXNzLmVudlsnRUNIT19XRUJfU0VSVkVSX1BPUlQnXSB8fCB1bmRlZmluZWRcblxuLy8gU3RhcnQgdGhlIHNlcnZlci5cbmNvbnN0IHsgc3RvcCwgYWRkTG9nZ2VyIH0gPSBzZXJ2ZXIuc3RhcnQoaG9zdCwgcG9ydCwgKHtob3N0LCBwb3J0fSkgPT4ge1xuICBjb25zb2xlLmxvZyhgW0VXU10gTmV3IHNlcnZlciBydW5uaW5nIGF0IGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0vYClcbn0pXG5cbmFkZExvZ2dlcihsb2dBc0hUTUwsIGxvZ1RvQ29uc29sZSlcblxuLy8gQ3JlYXRlIGEgbmV3IGxvZ2dlciB0aGF0IGdpdmVzIHVzIGEgd2F5IHRvIGdyYWNlZnVsbHkgc2h1dGRvd24gdGhlIHNlcnZlclxuLy8gd2hlbiBnaXZlbiBhIFwic2VjcmV0XCIgdXJsLiBUaGlzIHdvdWxkIGJlIGEgYmFkIGlkZWEgaW4gYSByZWFsIGFwcGxpY2F0aW9uLFxuLy8gYnV0IGl0J3Mgc2FmZSBlbm91Z2ggZm9yIHRlc3RpbmcuXG5hZGRMb2dnZXIoKHtob3N0LCBwb3J0LCB1cmx9KSA9PiB7XG4gIGlmICh1cmwgPT09ICcvc3RvcC9zdG9wL3N0b3AnKSB7XG4gICAgY29uc29sZS5sb2coYFtFV1NdICR7aG9zdH06JHtwb3J0fTogUmVjZWl2ZWQgc2h1dGRvd24gcmVxdWVzdCBcIi9zdG9wL3N0b3Avc3RvcFwiYClcbiAgICBzdG9wKGNvbnNvbGUubG9nLmJpbmQoY29uc29sZS5sb2csIGBbRVdTXSAke2hvc3R9OiR7cG9ydH06IElzIHNodXR0aW5nIGRvd24hYCkpXG4gIH1cbn0pXG5cbi8vIFF1aWNrIGhlbHBlciBmdW5jdGlvbiB0byBmaW5kIGFueSBzcGVjaWZpYyBjb21tYW5kIGxpbmUgZmxhZ3MgdGhlIHVzZXIgbWF5XG4vLyBoYXZlIHBhc3NlZCBpbi5cbmZ1bmN0aW9uIGdldFZhbHVlRm9yRmxhZyAoZmxhZywgYXJncykge1xuICBjb25zdCBpID0gYXJncy5pbmRleE9mKGZsYWcpXG4gIGlmIChpID09PSAtMSkgcmV0dXJuIHVuZGVmaW5lZFxuICByZXR1cm4gYXJnc1tpICsgMV1cbn1cbiJdfQ==