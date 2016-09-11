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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4uanMiXSwibmFtZXMiOlsic2VydmVyIiwicmVxdWlyZSIsImxvZ0FzSFRNTCIsImxvZ1RvQ29uc29sZSIsImFyZ3YiLCJwcm9jZXNzIiwic3BsaWNlIiwiaG9zdCIsImdldFZhbHVlRm9yRmxhZyIsImVudiIsInBvcnQiLCJzdGFydCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiYWRkTG9nZ2VyIiwidXJsIiwiZmxhZyIsImFyZ3MiLCJpIiwiaW5kZXhPZiIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFFQTtBQUNBOztBQUNBLElBQU1BLFNBQVNDLFFBQVEsc0JBQVIsQ0FBZjtBQUNBLElBQU1DLFlBQVlELFFBQVEsbUJBQVIsQ0FBbEI7QUFDQSxJQUFNRSxlQUFlRixRQUFRLHNCQUFSLENBQXJCOztBQUVBLElBQU1HLE9BQU9DLFFBQVFELElBQVIsQ0FBYUUsTUFBYixDQUFvQixDQUFwQixDQUFiOztBQUVBO0FBQ0EsSUFBTUMsT0FBT0MsZ0JBQWdCLElBQWhCLEVBQXNCSixJQUF0QixLQUErQkMsUUFBUUksR0FBUixDQUFZLHNCQUFaLENBQTVDO0FBQ0EsSUFBTUMsT0FBT0YsZ0JBQWdCLElBQWhCLEVBQXNCSixJQUF0QixLQUErQkMsUUFBUUksR0FBUixDQUFZLHNCQUFaLENBQTVDOztBQUVBOztBQUVBOztvQkFDNEJULE9BQU9XLEtBQVAsQ0FBYUQsSUFBYixFQUFtQkgsSUFBbkIsRUFBeUIsaUJBQWtCO0FBQUEsTUFBaEJBLElBQWdCLFNBQWhCQSxJQUFnQjtBQUFBLE1BQVZHLElBQVUsU0FBVkEsSUFBVTs7QUFDckVFLFVBQVFDLEdBQVIsK0JBQXdDTixJQUF4QyxTQUFnREcsSUFBaEQ7QUFDRCxDQUYyQixDOztJQUFwQkksSSxpQkFBQUEsSTtJQUFNQyxTLGlCQUFBQSxTOztBQUlkOztBQUNBQSxVQUFVYixTQUFWLEVBQXFCQyxZQUFyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQVksVUFBVSxnQkFBdUI7QUFBQSxNQUFyQlIsSUFBcUIsUUFBckJBLElBQXFCO0FBQUEsTUFBZkcsSUFBZSxRQUFmQSxJQUFlO0FBQUEsTUFBVE0sR0FBUyxRQUFUQSxHQUFTOztBQUMvQixNQUFJQSxRQUFRLGlCQUFaLEVBQStCO0FBQzdCRixTQUFLLFlBQU07QUFDVEYsY0FBUUMsR0FBUixPQUFnQk4sSUFBaEIsU0FBd0JHLElBQXhCO0FBQ0FFLGNBQVFDLEdBQVIsT0FBZ0JOLElBQWhCLFNBQXdCRyxJQUF4QjtBQUNELEtBSEQ7QUFJRDtBQUNGLENBUEQ7O0FBU0E7QUFDQTtBQUNBLFNBQVNGLGVBQVQsQ0FBMEJTLElBQTFCLEVBQWdDQyxJQUFoQyxFQUFzQztBQUNwQyxNQUFNQyxJQUFJRCxLQUFLRSxPQUFMLENBQWFILElBQWIsQ0FBVjtBQUNBLE1BQUlFLE1BQU0sQ0FBQyxDQUFYLEVBQWMsT0FBT0UsU0FBUDtBQUNkLFNBQU9ILEtBQUtDLElBQUksQ0FBVCxDQUFQO0FBQ0QiLCJmaWxlIjoiYmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4ndXNlIHN0cmljdCdcclxuLy8gRGVwZW5kZW5jaWVzXHJcbmNvbnN0IHNlcnZlciA9IHJlcXVpcmUoJy4vZWNoby13ZWItc2VydmVyLmpzJylcclxuY29uc3QgbG9nQXNIVE1MID0gcmVxdWlyZSgnLi9sb2dnZXJzL2FzLWh0bWwnKVxyXG5jb25zdCBsb2dUb0NvbnNvbGUgPSByZXF1aXJlKCcuL2xvZ2dlcnMvdG8tY29uc29sZScpXHJcblxyXG5jb25zdCBhcmd2ID0gcHJvY2Vzcy5hcmd2LnNwbGljZSgyKVxyXG5cclxuLy8gRU5WIGRlZmF1bHRzXHJcbmNvbnN0IGhvc3QgPSBnZXRWYWx1ZUZvckZsYWcoJy1oJywgYXJndikgfHwgcHJvY2Vzcy5lbnZbJ0VDSE9fV0VCX1NFUlZFUl9IT1NUJ11cclxuY29uc3QgcG9ydCA9IGdldFZhbHVlRm9yRmxhZygnLXAnLCBhcmd2KSB8fCBwcm9jZXNzLmVudlsnRUNIT19XRUJfU0VSVkVSX1BPUlQnXVxyXG5cclxuLy8gT3VyIHNlcnZlclxyXG5cclxuLy8gU3RhcnQgdGhlIHNlcnZlci5cclxuY29uc3QgeyBzdG9wLCBhZGRMb2dnZXIgfSA9IHNlcnZlci5zdGFydChwb3J0LCBob3N0LCAoe2hvc3QsIHBvcnR9KSA9PiB7XHJcbiAgY29uc29sZS5sb2coYFNlcnZlciBydW5uaW5nIGF0IGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0vYClcclxufSlcclxuXHJcbi8vIEFkZCBvdXIgZGVmYXVsdCBsb2dnZXJzLlxyXG5hZGRMb2dnZXIobG9nQXNIVE1MLCBsb2dUb0NvbnNvbGUpXHJcblxyXG4vLyBDcmVhdGUgYSBuZXcgbG9nZ2VyIHRoYXQgZ2l2ZXMgdXMgYSB3YXkgdG8gZ3JhY2VmdWxseSBzaHV0ZG93biB0aGUgc2VydmVyXHJcbi8vIHdoZW4gZ2l2ZW4gYSBcInNlY3JldFwiIHVybC4gVGhpcyB3b3VsZCBiZSBhIGJhZCBpZGVhIGluIGEgcmVhbCBhcHBsaWNhdGlvbixcclxuLy8gYnV0IGl0J3Mgc2FmZSBlbm91Z2ggZm9yIHRlc3RpbmcuXHJcbmFkZExvZ2dlcigoe2hvc3QsIHBvcnQsIHVybH0pID0+IHtcclxuICBpZiAodXJsID09PSAnL3N0b3Avc3RvcC9zdG9wJykge1xyXG4gICAgc3RvcCgoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtob3N0fToke3BvcnR9XSBSZWNpZXZlZCBzaHV0ZG93biByZXF1ZXN0IFwiL3N0b3Avc3RvcC9zdG9wXCJgKVxyXG4gICAgICBjb25zb2xlLmxvZyhgWyR7aG9zdH06JHtwb3J0fV0gVGhlIFNlcnZlciB3aWxsIHNodXQgZG93biFgKVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG4vLyBRdWljayBoZWxwZXIgZnVuY3Rpb24gdG8gZmluZCBhbnkgc3BlY2lmaWMgY29tbWFuZCBsaW5lIGZsYWdzIHRoZSB1c2VyIG1heVxyXG4vLyBoYXZlIHBhc3NlZCBpbi5cclxuZnVuY3Rpb24gZ2V0VmFsdWVGb3JGbGFnIChmbGFnLCBhcmdzKSB7XHJcbiAgY29uc3QgaSA9IGFyZ3MuaW5kZXhPZihmbGFnKVxyXG4gIGlmIChpID09PSAtMSkgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIHJldHVybiBhcmdzW2kgKyAxXVxyXG59XHJcbiJdfQ==