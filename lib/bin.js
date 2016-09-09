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
var stop = server.start(port, host, function (_ref) {
  var host = _ref.host;
  var port = _ref.port;

  console.log('Server running at http://' + host + ':' + port + '/');
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4uanMiXSwibmFtZXMiOlsiYXJndiIsInByb2Nlc3MiLCJzcGxpY2UiLCJob3N0IiwiZ2V0VmFsdWVGb3JGbGFnIiwiZW52IiwicG9ydCIsInNlcnZlciIsInJlcXVpcmUiLCJzdG9wIiwic3RhcnQiLCJjb25zb2xlIiwibG9nIiwiYWRkTG9nZ2VyIiwidXJsIiwiZmxhZyIsImFyZ3MiLCJpIiwiaW5kZXhPZiIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRRCxJQUFSLENBQWFFLE1BQWIsQ0FBb0IsQ0FBcEIsQ0FBYjs7QUFFQTtBQUNBLElBQU1DLE9BQU9DLGdCQUFnQixJQUFoQixFQUFzQkosSUFBdEIsS0FBK0JDLFFBQVFJLEdBQVIsQ0FBWSxzQkFBWixDQUE1QztBQUNBLElBQU1DLE9BQU9GLGdCQUFnQixJQUFoQixFQUFzQkosSUFBdEIsS0FBK0JDLFFBQVFJLEdBQVIsQ0FBWSxzQkFBWixDQUE1Qzs7QUFFQTtBQUNBLElBQU1FLFNBQVNDLFFBQVEsc0JBQVIsQ0FBZjs7QUFFQTtBQUNBO0FBQ0EsSUFBTUMsT0FBT0YsT0FBT0csS0FBUCxDQUFhSixJQUFiLEVBQW1CSCxJQUFuQixFQUF5QixnQkFBa0I7QUFBQSxNQUFoQkEsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsTUFBVkcsSUFBVSxRQUFWQSxJQUFVOztBQUN0REssVUFBUUMsR0FBUiwrQkFBd0NULElBQXhDLFNBQWdERyxJQUFoRDtBQUNELENBRlksQ0FBYjs7QUFJQTtBQUNBO0FBQ0E7QUFDQUMsT0FBT00sU0FBUCxDQUFpQixpQkFBdUI7QUFBQSxNQUFyQlYsSUFBcUIsU0FBckJBLElBQXFCO0FBQUEsTUFBZkcsSUFBZSxTQUFmQSxJQUFlO0FBQUEsTUFBVFEsR0FBUyxTQUFUQSxHQUFTOztBQUN0QyxNQUFJQSxRQUFRLGlCQUFaLEVBQStCO0FBQzdCTCxTQUFLLFlBQU07QUFDVEUsY0FBUUMsR0FBUixPQUFnQlQsSUFBaEIsU0FBd0JHLElBQXhCO0FBQ0FLLGNBQVFDLEdBQVIsT0FBZ0JULElBQWhCLFNBQXdCRyxJQUF4QjtBQUNELEtBSEQ7QUFJRDtBQUNGLENBUEQ7O0FBU0E7QUFDQTtBQUNBLFNBQVNGLGVBQVQsQ0FBMEJXLElBQTFCLEVBQWdDQyxJQUFoQyxFQUFzQztBQUNwQyxNQUFNQyxJQUFJRCxLQUFLRSxPQUFMLENBQWFILElBQWIsQ0FBVjtBQUNBLE1BQUlFLE1BQU0sQ0FBQyxDQUFYLEVBQWMsT0FBT0UsU0FBUDtBQUNkLFNBQU9ILEtBQUtDLElBQUksQ0FBVCxDQUFQO0FBQ0QiLCJmaWxlIjoiYmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhcmd2ID0gcHJvY2Vzcy5hcmd2LnNwbGljZSgyKVxuXG4vLyBFTlYgZGVmYXVsdHNcbmNvbnN0IGhvc3QgPSBnZXRWYWx1ZUZvckZsYWcoJy1oJywgYXJndikgfHwgcHJvY2Vzcy5lbnZbJ0VDSE9fV0VCX1NFUlZFUl9IT1NUJ11cbmNvbnN0IHBvcnQgPSBnZXRWYWx1ZUZvckZsYWcoJy1wJywgYXJndikgfHwgcHJvY2Vzcy5lbnZbJ0VDSE9fV0VCX1NFUlZFUl9QT1JUJ11cblxuLy8gT3VyIHNlcnZlclxuY29uc3Qgc2VydmVyID0gcmVxdWlyZSgnLi9lY2hvLXdlYi1zZXJ2ZXIuanMnKVxuXG4vLyBTdGFydCB0aGUgc2VydmVyLCBzdG9yaW5nIHRoZSBmdW5jdGlvbiByZXR1cm5lZCBieSB0aGUgYHN0YXJ0YCBtZXRob2Qgc28gd2Vcbi8vIGNhbiBncmFjZWZ1bGx5IHNodXQgZG93bnQgaGUgc2VydmVyIGxhdGVyLlxuY29uc3Qgc3RvcCA9IHNlcnZlci5zdGFydChwb3J0LCBob3N0LCAoe2hvc3QsIHBvcnR9KSA9PiB7XG4gIGNvbnNvbGUubG9nKGBTZXJ2ZXIgcnVubmluZyBhdCBodHRwOi8vJHtob3N0fToke3BvcnR9L2ApXG59KVxuXG4vLyBXZSdsbCB1c2UgdGhlIHNlcnZlcidzIGFkZExvZ2dlciBtZXRob2QgdG8gZ2l2ZSB1cyBhIHdheSB0byBncmFjZWZ1bGx5XG4vLyBzaHV0ZG93biB0aGUgc2VydmVyLiBUaGlzIHdvdWxkIGJlIGEgYmFkIGlkZWEgaW4gYSByZWFsIGFwcGxpY2F0aW9uLCBidXRcbi8vIGl0J3Mgc2FmZSBlbm91Z2ggZm9yIHRlc3RpbmcuXG5zZXJ2ZXIuYWRkTG9nZ2VyKCh7aG9zdCwgcG9ydCwgdXJsfSkgPT4ge1xuICBpZiAodXJsID09PSAnL3N0b3Avc3RvcC9zdG9wJykge1xuICAgIHN0b3AoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFske2hvc3R9OiR7cG9ydH1dIFJlY2lldmVkIHNodXRkb3duIHJlcXVlc3QgXCIvc3RvcC9zdG9wL3N0b3BcImApXG4gICAgICBjb25zb2xlLmxvZyhgWyR7aG9zdH06JHtwb3J0fV0gVGhlIFNlcnZlciB3aWxsIHNodXQgZG93biFgKVxuICAgIH0pXG4gIH1cbn0pXG5cbi8vIFF1aWNrIGhlbHBlciBmdW5jdGlvbiB0byBmaW5kIGFueSBzcGVjaWZpYyBjb21tYW5kIGxpbmUgZmxhZ3MgdGhlIHVzZXIgbWF5XG4vLyBoYXZlIHBhc3NlZCBpbi5cbmZ1bmN0aW9uIGdldFZhbHVlRm9yRmxhZyAoZmxhZywgYXJncykge1xuICBjb25zdCBpID0gYXJncy5pbmRleE9mKGZsYWcpXG4gIGlmIChpID09PSAtMSkgcmV0dXJuIHVuZGVmaW5lZFxuICByZXR1cm4gYXJnc1tpICsgMV1cbn1cbiJdfQ==