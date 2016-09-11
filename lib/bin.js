// #!/usr/bin/env node

'use strict';
// Dependencies

var server = require('./echo-web-server.js');
var logAsHTML = require('./loggers/as-html');
var logToConsole = require('./loggers/to-console');

var argv = process.argv.splice(2);

// ENV defaults
var host = getValueForFlag('-h', argv) || process.env['ECHO_WEB_SERVER_HOST'];
var port = getValueForFlag('-p', argv) || process.env['ECHO_WEB_SERVER_PORT'];

// Our server

// Start the server.

var _server$start = server.start(port, host, function (_ref2) {
  var host = _ref2.host;
  var port = _ref2.port;

  console.log('Server running at http://' + host + ':' + port + '/');
});

var stop = _server$start.stop;
var addLogger = _server$start.addLogger;

// Add our default loggers.

addLogger(logAsHTML, logToConsole);

// Create a new logger that gives us a way to gracefully shutdown the server
// when given a "secret" url. This would be a bad idea in a real application,
// but it's safe enough for testing.
addLogger(function (_ref) {
  var host = _ref.host;
  var port = _ref.port;
  var url = _ref.url;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4uanMiXSwibmFtZXMiOlsic2VydmVyIiwicmVxdWlyZSIsImxvZ0FzSFRNTCIsImxvZ1RvQ29uc29sZSIsImFyZ3YiLCJwcm9jZXNzIiwic3BsaWNlIiwiaG9zdCIsImdldFZhbHVlRm9yRmxhZyIsImVudiIsInBvcnQiLCJzdGFydCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiYWRkTG9nZ2VyIiwidXJsIiwiZmxhZyIsImFyZ3MiLCJpIiwiaW5kZXhPZiIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTs7QUFDQSxJQUFNQSxTQUFTQyxRQUFRLHNCQUFSLENBQWY7QUFDQSxJQUFNQyxZQUFZRCxRQUFRLG1CQUFSLENBQWxCO0FBQ0EsSUFBTUUsZUFBZUYsUUFBUSxzQkFBUixDQUFyQjs7QUFFQSxJQUFNRyxPQUFPQyxRQUFRRCxJQUFSLENBQWFFLE1BQWIsQ0FBb0IsQ0FBcEIsQ0FBYjs7QUFFQTtBQUNBLElBQU1DLE9BQU9DLGdCQUFnQixJQUFoQixFQUFzQkosSUFBdEIsS0FBK0JDLFFBQVFJLEdBQVIsQ0FBWSxzQkFBWixDQUE1QztBQUNBLElBQU1DLE9BQU9GLGdCQUFnQixJQUFoQixFQUFzQkosSUFBdEIsS0FBK0JDLFFBQVFJLEdBQVIsQ0FBWSxzQkFBWixDQUE1Qzs7QUFFQTs7QUFFQTs7b0JBQzRCVCxPQUFPVyxLQUFQLENBQWFELElBQWIsRUFBbUJILElBQW5CLEVBQXlCLGlCQUFrQjtBQUFBLE1BQWhCQSxJQUFnQixTQUFoQkEsSUFBZ0I7QUFBQSxNQUFWRyxJQUFVLFNBQVZBLElBQVU7O0FBQ3JFRSxVQUFRQyxHQUFSLCtCQUF3Q04sSUFBeEMsU0FBZ0RHLElBQWhEO0FBQ0QsQ0FGMkIsQzs7SUFBcEJJLEksaUJBQUFBLEk7SUFBTUMsUyxpQkFBQUEsUzs7QUFJZDs7QUFDQUEsVUFBVWIsU0FBVixFQUFxQkMsWUFBckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0FZLFVBQVUsZ0JBQXVCO0FBQUEsTUFBckJSLElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLE1BQWZHLElBQWUsUUFBZkEsSUFBZTtBQUFBLE1BQVRNLEdBQVMsUUFBVEEsR0FBUzs7QUFDL0IsTUFBSUEsUUFBUSxpQkFBWixFQUErQjtBQUM3QkYsU0FBSyxZQUFNO0FBQ1RGLGNBQVFDLEdBQVIsT0FBZ0JOLElBQWhCLFNBQXdCRyxJQUF4QjtBQUNBRSxjQUFRQyxHQUFSLE9BQWdCTixJQUFoQixTQUF3QkcsSUFBeEI7QUFDRCxLQUhEO0FBSUQ7QUFDRixDQVBEOztBQVNBO0FBQ0E7QUFDQSxTQUFTRixlQUFULENBQTBCUyxJQUExQixFQUFnQ0MsSUFBaEMsRUFBc0M7QUFDcEMsTUFBTUMsSUFBSUQsS0FBS0UsT0FBTCxDQUFhSCxJQUFiLENBQVY7QUFDQSxNQUFJRSxNQUFNLENBQUMsQ0FBWCxFQUFjLE9BQU9FLFNBQVA7QUFDZCxTQUFPSCxLQUFLQyxJQUFJLENBQVQsQ0FBUDtBQUNEIiwiZmlsZSI6ImJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICMhL3Vzci9iaW4vZW52IG5vZGVcblxuJ3VzZSBzdHJpY3QnXG4vLyBEZXBlbmRlbmNpZXNcbmNvbnN0IHNlcnZlciA9IHJlcXVpcmUoJy4vZWNoby13ZWItc2VydmVyLmpzJylcbmNvbnN0IGxvZ0FzSFRNTCA9IHJlcXVpcmUoJy4vbG9nZ2Vycy9hcy1odG1sJylcbmNvbnN0IGxvZ1RvQ29uc29sZSA9IHJlcXVpcmUoJy4vbG9nZ2Vycy90by1jb25zb2xlJylcblxuY29uc3QgYXJndiA9IHByb2Nlc3MuYXJndi5zcGxpY2UoMilcblxuLy8gRU5WIGRlZmF1bHRzXG5jb25zdCBob3N0ID0gZ2V0VmFsdWVGb3JGbGFnKCctaCcsIGFyZ3YpIHx8IHByb2Nlc3MuZW52WydFQ0hPX1dFQl9TRVJWRVJfSE9TVCddXG5jb25zdCBwb3J0ID0gZ2V0VmFsdWVGb3JGbGFnKCctcCcsIGFyZ3YpIHx8IHByb2Nlc3MuZW52WydFQ0hPX1dFQl9TRVJWRVJfUE9SVCddXG5cbi8vIE91ciBzZXJ2ZXJcblxuLy8gU3RhcnQgdGhlIHNlcnZlci5cbmNvbnN0IHsgc3RvcCwgYWRkTG9nZ2VyIH0gPSBzZXJ2ZXIuc3RhcnQocG9ydCwgaG9zdCwgKHtob3N0LCBwb3J0fSkgPT4ge1xuICBjb25zb2xlLmxvZyhgU2VydmVyIHJ1bm5pbmcgYXQgaHR0cDovLyR7aG9zdH06JHtwb3J0fS9gKVxufSlcblxuLy8gQWRkIG91ciBkZWZhdWx0IGxvZ2dlcnMuXG5hZGRMb2dnZXIobG9nQXNIVE1MLCBsb2dUb0NvbnNvbGUpXG5cbi8vIENyZWF0ZSBhIG5ldyBsb2dnZXIgdGhhdCBnaXZlcyB1cyBhIHdheSB0byBncmFjZWZ1bGx5IHNodXRkb3duIHRoZSBzZXJ2ZXJcbi8vIHdoZW4gZ2l2ZW4gYSBcInNlY3JldFwiIHVybC4gVGhpcyB3b3VsZCBiZSBhIGJhZCBpZGVhIGluIGEgcmVhbCBhcHBsaWNhdGlvbixcbi8vIGJ1dCBpdCdzIHNhZmUgZW5vdWdoIGZvciB0ZXN0aW5nLlxuYWRkTG9nZ2VyKCh7aG9zdCwgcG9ydCwgdXJsfSkgPT4ge1xuICBpZiAodXJsID09PSAnL3N0b3Avc3RvcC9zdG9wJykge1xuICAgIHN0b3AoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFske2hvc3R9OiR7cG9ydH1dIFJlY2lldmVkIHNodXRkb3duIHJlcXVlc3QgXCIvc3RvcC9zdG9wL3N0b3BcImApXG4gICAgICBjb25zb2xlLmxvZyhgWyR7aG9zdH06JHtwb3J0fV0gVGhlIFNlcnZlciB3aWxsIHNodXQgZG93biFgKVxuICAgIH0pXG4gIH1cbn0pXG5cbi8vIFF1aWNrIGhlbHBlciBmdW5jdGlvbiB0byBmaW5kIGFueSBzcGVjaWZpYyBjb21tYW5kIGxpbmUgZmxhZ3MgdGhlIHVzZXIgbWF5XG4vLyBoYXZlIHBhc3NlZCBpbi5cbmZ1bmN0aW9uIGdldFZhbHVlRm9yRmxhZyAoZmxhZywgYXJncykge1xuICBjb25zdCBpID0gYXJncy5pbmRleE9mKGZsYWcpXG4gIGlmIChpID09PSAtMSkgcmV0dXJuIHVuZGVmaW5lZFxuICByZXR1cm4gYXJnc1tpICsgMV1cbn1cbiJdfQ==