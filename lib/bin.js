#!/usr/bin/env node


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

// Start the server. It returns two functions, `stop` that lets us gracefully
// shutdown the server, and `addLogger`, which lets us add custom loggers to
// the server.

var _server$start = server.start(port, host, function (_ref2) {
  var host = _ref2.host;
  var port = _ref2.port;

  console.log('Server running at http://' + host + ':' + port + '/');
});

var stop = _server$start.stop;
var addLogger = _server$start.addLogger;

// Add our default loggers.

addLogger(logAsHTML, logToConsole);

// Create a new logger that gives us a way to gracefully shutdown the server.
// This would be a bad idea in a real application, but it's safe enough for
// testing.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4uanMiXSwibmFtZXMiOlsic2VydmVyIiwicmVxdWlyZSIsImxvZ0FzSFRNTCIsImxvZ1RvQ29uc29sZSIsImFyZ3YiLCJwcm9jZXNzIiwic3BsaWNlIiwiaG9zdCIsImdldFZhbHVlRm9yRmxhZyIsImVudiIsInBvcnQiLCJzdGFydCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiYWRkTG9nZ2VyIiwidXJsIiwiZmxhZyIsImFyZ3MiLCJpIiwiaW5kZXhPZiIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFFQTtBQUNBOztBQUNBLElBQU1BLFNBQVNDLFFBQVEsc0JBQVIsQ0FBZjtBQUNBLElBQU1DLFlBQVlELFFBQVEsbUJBQVIsQ0FBbEI7QUFDQSxJQUFNRSxlQUFlRixRQUFRLHNCQUFSLENBQXJCOztBQUVBLElBQU1HLE9BQU9DLFFBQVFELElBQVIsQ0FBYUUsTUFBYixDQUFvQixDQUFwQixDQUFiOztBQUVBO0FBQ0EsSUFBTUMsT0FBT0MsZ0JBQWdCLElBQWhCLEVBQXNCSixJQUF0QixLQUErQkMsUUFBUUksR0FBUixDQUFZLHNCQUFaLENBQTVDO0FBQ0EsSUFBTUMsT0FBT0YsZ0JBQWdCLElBQWhCLEVBQXNCSixJQUF0QixLQUErQkMsUUFBUUksR0FBUixDQUFZLHNCQUFaLENBQTVDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7b0JBQzRCVCxPQUFPVyxLQUFQLENBQWFELElBQWIsRUFBbUJILElBQW5CLEVBQXlCLGlCQUFrQjtBQUFBLE1BQWhCQSxJQUFnQixTQUFoQkEsSUFBZ0I7QUFBQSxNQUFWRyxJQUFVLFNBQVZBLElBQVU7O0FBQ3JFRSxVQUFRQyxHQUFSLCtCQUF3Q04sSUFBeEMsU0FBZ0RHLElBQWhEO0FBQ0QsQ0FGMkIsQzs7SUFBcEJJLEksaUJBQUFBLEk7SUFBTUMsUyxpQkFBQUEsUzs7QUFJZDs7QUFDQUEsVUFBVWIsU0FBVixFQUFxQkMsWUFBckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0FZLFVBQVUsZ0JBQXVCO0FBQUEsTUFBckJSLElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLE1BQWZHLElBQWUsUUFBZkEsSUFBZTtBQUFBLE1BQVRNLEdBQVMsUUFBVEEsR0FBUzs7QUFDL0IsTUFBSUEsUUFBUSxpQkFBWixFQUErQjtBQUM3QkYsU0FBSyxZQUFNO0FBQ1RGLGNBQVFDLEdBQVIsT0FBZ0JOLElBQWhCLFNBQXdCRyxJQUF4QjtBQUNBRSxjQUFRQyxHQUFSLE9BQWdCTixJQUFoQixTQUF3QkcsSUFBeEI7QUFDRCxLQUhEO0FBSUQ7QUFDRixDQVBEOztBQVNBO0FBQ0E7QUFDQSxTQUFTRixlQUFULENBQTBCUyxJQUExQixFQUFnQ0MsSUFBaEMsRUFBc0M7QUFDcEMsTUFBTUMsSUFBSUQsS0FBS0UsT0FBTCxDQUFhSCxJQUFiLENBQVY7QUFDQSxNQUFJRSxNQUFNLENBQUMsQ0FBWCxFQUFjLE9BQU9FLFNBQVA7QUFDZCxTQUFPSCxLQUFLQyxJQUFJLENBQVQsQ0FBUDtBQUNEIiwiZmlsZSI6ImJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4ndXNlIHN0cmljdCdcbi8vIERlcGVuZGVuY2llc1xuY29uc3Qgc2VydmVyID0gcmVxdWlyZSgnLi9lY2hvLXdlYi1zZXJ2ZXIuanMnKVxuY29uc3QgbG9nQXNIVE1MID0gcmVxdWlyZSgnLi9sb2dnZXJzL2FzLWh0bWwnKVxuY29uc3QgbG9nVG9Db25zb2xlID0gcmVxdWlyZSgnLi9sb2dnZXJzL3RvLWNvbnNvbGUnKVxuXG5jb25zdCBhcmd2ID0gcHJvY2Vzcy5hcmd2LnNwbGljZSgyKVxuXG4vLyBFTlYgZGVmYXVsdHNcbmNvbnN0IGhvc3QgPSBnZXRWYWx1ZUZvckZsYWcoJy1oJywgYXJndikgfHwgcHJvY2Vzcy5lbnZbJ0VDSE9fV0VCX1NFUlZFUl9IT1NUJ11cbmNvbnN0IHBvcnQgPSBnZXRWYWx1ZUZvckZsYWcoJy1wJywgYXJndikgfHwgcHJvY2Vzcy5lbnZbJ0VDSE9fV0VCX1NFUlZFUl9QT1JUJ11cblxuLy8gT3VyIHNlcnZlclxuXG4vLyBTdGFydCB0aGUgc2VydmVyLiBJdCByZXR1cm5zIHR3byBmdW5jdGlvbnMsIGBzdG9wYCB0aGF0IGxldHMgdXMgZ3JhY2VmdWxseVxuLy8gc2h1dGRvd24gdGhlIHNlcnZlciwgYW5kIGBhZGRMb2dnZXJgLCB3aGljaCBsZXRzIHVzIGFkZCBjdXN0b20gbG9nZ2VycyB0b1xuLy8gdGhlIHNlcnZlci5cbmNvbnN0IHsgc3RvcCwgYWRkTG9nZ2VyIH0gPSBzZXJ2ZXIuc3RhcnQocG9ydCwgaG9zdCwgKHtob3N0LCBwb3J0fSkgPT4ge1xuICBjb25zb2xlLmxvZyhgU2VydmVyIHJ1bm5pbmcgYXQgaHR0cDovLyR7aG9zdH06JHtwb3J0fS9gKVxufSlcblxuLy8gQWRkIG91ciBkZWZhdWx0IGxvZ2dlcnMuXG5hZGRMb2dnZXIobG9nQXNIVE1MLCBsb2dUb0NvbnNvbGUpXG5cbi8vIENyZWF0ZSBhIG5ldyBsb2dnZXIgdGhhdCBnaXZlcyB1cyBhIHdheSB0byBncmFjZWZ1bGx5IHNodXRkb3duIHRoZSBzZXJ2ZXIuXG4vLyBUaGlzIHdvdWxkIGJlIGEgYmFkIGlkZWEgaW4gYSByZWFsIGFwcGxpY2F0aW9uLCBidXQgaXQncyBzYWZlIGVub3VnaCBmb3Jcbi8vIHRlc3RpbmcuXG5hZGRMb2dnZXIoKHtob3N0LCBwb3J0LCB1cmx9KSA9PiB7XG4gIGlmICh1cmwgPT09ICcvc3RvcC9zdG9wL3N0b3AnKSB7XG4gICAgc3RvcCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgWyR7aG9zdH06JHtwb3J0fV0gUmVjaWV2ZWQgc2h1dGRvd24gcmVxdWVzdCBcIi9zdG9wL3N0b3Avc3RvcFwiYClcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtob3N0fToke3BvcnR9XSBUaGUgU2VydmVyIHdpbGwgc2h1dCBkb3duIWApXG4gICAgfSlcbiAgfVxufSlcblxuLy8gUXVpY2sgaGVscGVyIGZ1bmN0aW9uIHRvIGZpbmQgYW55IHNwZWNpZmljIGNvbW1hbmQgbGluZSBmbGFncyB0aGUgdXNlciBtYXlcbi8vIGhhdmUgcGFzc2VkIGluLlxuZnVuY3Rpb24gZ2V0VmFsdWVGb3JGbGFnIChmbGFnLCBhcmdzKSB7XG4gIGNvbnN0IGkgPSBhcmdzLmluZGV4T2YoZmxhZylcbiAgaWYgKGkgPT09IC0xKSByZXR1cm4gdW5kZWZpbmVkXG4gIHJldHVybiBhcmdzW2kgKyAxXVxufVxuIl19