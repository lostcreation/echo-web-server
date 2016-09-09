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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4uanMiXSwibmFtZXMiOlsic2VydmVyIiwicmVxdWlyZSIsImxvZ0FzSFRNTCIsImxvZ1RvQ29uc29sZSIsImFyZ3YiLCJwcm9jZXNzIiwic3BsaWNlIiwiaG9zdCIsImdldFZhbHVlRm9yRmxhZyIsImVudiIsInBvcnQiLCJzdGFydCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiYWRkTG9nZ2VyIiwidXJsIiwiZmxhZyIsImFyZ3MiLCJpIiwiaW5kZXhPZiIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFFQTtBQUNBOztBQUNBLElBQU1BLFNBQVNDLFFBQVEsc0JBQVIsQ0FBZjtBQUNBLElBQU1DLFlBQVlELFFBQVEsbUJBQVIsQ0FBbEI7QUFDQSxJQUFNRSxlQUFlRixRQUFRLHNCQUFSLENBQXJCOztBQUVBLElBQU1HLE9BQU9DLFFBQVFELElBQVIsQ0FBYUUsTUFBYixDQUFvQixDQUFwQixDQUFiOztBQUVBO0FBQ0EsSUFBTUMsT0FBT0MsZ0JBQWdCLElBQWhCLEVBQXNCSixJQUF0QixLQUErQkMsUUFBUUksR0FBUixDQUFZLHNCQUFaLENBQTVDO0FBQ0EsSUFBTUMsT0FBT0YsZ0JBQWdCLElBQWhCLEVBQXNCSixJQUF0QixLQUErQkMsUUFBUUksR0FBUixDQUFZLHNCQUFaLENBQTVDOztBQUVBOztBQUVBOztvQkFDNEJULE9BQU9XLEtBQVAsQ0FBYUQsSUFBYixFQUFtQkgsSUFBbkIsRUFBeUIsaUJBQWtCO0FBQUEsTUFBaEJBLElBQWdCLFNBQWhCQSxJQUFnQjtBQUFBLE1BQVZHLElBQVUsU0FBVkEsSUFBVTs7QUFDckVFLFVBQVFDLEdBQVIsK0JBQXdDTixJQUF4QyxTQUFnREcsSUFBaEQ7QUFDRCxDQUYyQixDOztJQUFwQkksSSxpQkFBQUEsSTtJQUFNQyxTLGlCQUFBQSxTOztBQUlkOztBQUNBQSxVQUFVYixTQUFWLEVBQXFCQyxZQUFyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQVksVUFBVSxnQkFBdUI7QUFBQSxNQUFyQlIsSUFBcUIsUUFBckJBLElBQXFCO0FBQUEsTUFBZkcsSUFBZSxRQUFmQSxJQUFlO0FBQUEsTUFBVE0sR0FBUyxRQUFUQSxHQUFTOztBQUMvQixNQUFJQSxRQUFRLGlCQUFaLEVBQStCO0FBQzdCRixTQUFLLFlBQU07QUFDVEYsY0FBUUMsR0FBUixPQUFnQk4sSUFBaEIsU0FBd0JHLElBQXhCO0FBQ0FFLGNBQVFDLEdBQVIsT0FBZ0JOLElBQWhCLFNBQXdCRyxJQUF4QjtBQUNELEtBSEQ7QUFJRDtBQUNGLENBUEQ7O0FBU0E7QUFDQTtBQUNBLFNBQVNGLGVBQVQsQ0FBMEJTLElBQTFCLEVBQWdDQyxJQUFoQyxFQUFzQztBQUNwQyxNQUFNQyxJQUFJRCxLQUFLRSxPQUFMLENBQWFILElBQWIsQ0FBVjtBQUNBLE1BQUlFLE1BQU0sQ0FBQyxDQUFYLEVBQWMsT0FBT0UsU0FBUDtBQUNkLFNBQU9ILEtBQUtDLElBQUksQ0FBVCxDQUFQO0FBQ0QiLCJmaWxlIjoiYmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbid1c2Ugc3RyaWN0J1xuLy8gRGVwZW5kZW5jaWVzXG5jb25zdCBzZXJ2ZXIgPSByZXF1aXJlKCcuL2VjaG8td2ViLXNlcnZlci5qcycpXG5jb25zdCBsb2dBc0hUTUwgPSByZXF1aXJlKCcuL2xvZ2dlcnMvYXMtaHRtbCcpXG5jb25zdCBsb2dUb0NvbnNvbGUgPSByZXF1aXJlKCcuL2xvZ2dlcnMvdG8tY29uc29sZScpXG5cbmNvbnN0IGFyZ3YgPSBwcm9jZXNzLmFyZ3Yuc3BsaWNlKDIpXG5cbi8vIEVOViBkZWZhdWx0c1xuY29uc3QgaG9zdCA9IGdldFZhbHVlRm9yRmxhZygnLWgnLCBhcmd2KSB8fCBwcm9jZXNzLmVudlsnRUNIT19XRUJfU0VSVkVSX0hPU1QnXVxuY29uc3QgcG9ydCA9IGdldFZhbHVlRm9yRmxhZygnLXAnLCBhcmd2KSB8fCBwcm9jZXNzLmVudlsnRUNIT19XRUJfU0VSVkVSX1BPUlQnXVxuXG4vLyBPdXIgc2VydmVyXG5cbi8vIFN0YXJ0IHRoZSBzZXJ2ZXIuXG5jb25zdCB7IHN0b3AsIGFkZExvZ2dlciB9ID0gc2VydmVyLnN0YXJ0KHBvcnQsIGhvc3QsICh7aG9zdCwgcG9ydH0pID0+IHtcbiAgY29uc29sZS5sb2coYFNlcnZlciBydW5uaW5nIGF0IGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0vYClcbn0pXG5cbi8vIEFkZCBvdXIgZGVmYXVsdCBsb2dnZXJzLlxuYWRkTG9nZ2VyKGxvZ0FzSFRNTCwgbG9nVG9Db25zb2xlKVxuXG4vLyBDcmVhdGUgYSBuZXcgbG9nZ2VyIHRoYXQgZ2l2ZXMgdXMgYSB3YXkgdG8gZ3JhY2VmdWxseSBzaHV0ZG93biB0aGUgc2VydmVyXG4vLyB3aGVuIGdpdmVuIGEgXCJzZWNyZXRcIiB1cmwuIFRoaXMgd291bGQgYmUgYSBiYWQgaWRlYSBpbiBhIHJlYWwgYXBwbGljYXRpb24sXG4vLyBidXQgaXQncyBzYWZlIGVub3VnaCBmb3IgdGVzdGluZy5cbmFkZExvZ2dlcigoe2hvc3QsIHBvcnQsIHVybH0pID0+IHtcbiAgaWYgKHVybCA9PT0gJy9zdG9wL3N0b3Avc3RvcCcpIHtcbiAgICBzdG9wKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtob3N0fToke3BvcnR9XSBSZWNpZXZlZCBzaHV0ZG93biByZXF1ZXN0IFwiL3N0b3Avc3RvcC9zdG9wXCJgKVxuICAgICAgY29uc29sZS5sb2coYFske2hvc3R9OiR7cG9ydH1dIFRoZSBTZXJ2ZXIgd2lsbCBzaHV0IGRvd24hYClcbiAgICB9KVxuICB9XG59KVxuXG4vLyBRdWljayBoZWxwZXIgZnVuY3Rpb24gdG8gZmluZCBhbnkgc3BlY2lmaWMgY29tbWFuZCBsaW5lIGZsYWdzIHRoZSB1c2VyIG1heVxuLy8gaGF2ZSBwYXNzZWQgaW4uXG5mdW5jdGlvbiBnZXRWYWx1ZUZvckZsYWcgKGZsYWcsIGFyZ3MpIHtcbiAgY29uc3QgaSA9IGFyZ3MuaW5kZXhPZihmbGFnKVxuICBpZiAoaSA9PT0gLTEpIHJldHVybiB1bmRlZmluZWRcbiAgcmV0dXJuIGFyZ3NbaSArIDFdXG59XG4iXX0=