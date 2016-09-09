'use strict';

// Dependencies

var http = require('http');
var asHTML = require('./loggers/as-html');
var toConsole = require('./loggers/to-console');

// Default Loggers
var loggers = [].push(toConsole, asHTML);
var addLogger = loggers.push.bind(loggers);

// Server Config
function start() {
  var port = arguments.length <= 0 || arguments[0] === undefined ? '8080' : arguments[0];
  var host = arguments.length <= 1 || arguments[1] === undefined ? '0.0.0.0' : arguments[1];
  var callback = arguments[2];

  // Handle special case for an auto-port.
  if (port === 'auto') port = 0;

  // Create the server we're starting.
  var server = http.createServer(function (req, res) {
    var requestInfo = Object.freeze({
      res: res,
      host: host,
      port: port,
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
    callback && callback({ host: host, port: port, running: true });
  });

  return function (callback) {
    process.disconnect && process.disconnect();
    server.listening && server.close(callback);
  };
}

// Exports
module.exports = {
  /**
   * Starts a server at the port and host indicated.
   * @param {string} [port='8080'] - Open port or 'auto' to assign a random free port.
   * @param {string} [host='0.0.0.0'] - IP or host name
   * @returns {function} - Stop this server then execute an optional callback function.
   */
  start: start,

  /**
   * Adds a logging function that will automatically be notified of new
   * requests.
   */
  addLogger: addLogger
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJhc0hUTUwiLCJ0b0NvbnNvbGUiLCJsb2dnZXJzIiwicHVzaCIsImFkZExvZ2dlciIsImJpbmQiLCJzdGFydCIsInBvcnQiLCJob3N0IiwiY2FsbGJhY2siLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJyZXEiLCJyZXMiLCJyZXF1ZXN0SW5mbyIsIk9iamVjdCIsImZyZWV6ZSIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJyZW1vdGVBZGRyZXNzIiwidXJsIiwiZGVjb2RlVVJJIiwic3RhdHVzQ29kZSIsInNldEhlYWRlciIsImZvckVhY2giLCJsb2ciLCJlbmQiLCJsaXN0ZW4iLCJhZGRyZXNzIiwicnVubmluZyIsInByb2Nlc3MiLCJkaXNjb25uZWN0IiwibGlzdGVuaW5nIiwiY2xvc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1DLFNBQVNELFFBQVEsbUJBQVIsQ0FBZjtBQUNBLElBQU1FLFlBQVlGLFFBQVEsc0JBQVIsQ0FBbEI7O0FBRUE7QUFDQSxJQUFNRyxVQUFVLEdBQUdDLElBQUgsQ0FBUUYsU0FBUixFQUFtQkQsTUFBbkIsQ0FBaEI7QUFDQSxJQUFNSSxZQUFZRixRQUFRQyxJQUFSLENBQWFFLElBQWIsQ0FBa0JILE9BQWxCLENBQWxCOztBQUVBO0FBQ0EsU0FBU0ksS0FBVCxHQUEyRDtBQUFBLE1BQTNDQyxJQUEyQyx5REFBcEMsTUFBb0M7QUFBQSxNQUE1QkMsSUFBNEIseURBQXJCLFNBQXFCO0FBQUEsTUFBVkMsUUFBVTs7QUFDekQ7QUFDQSxNQUFJRixTQUFTLE1BQWIsRUFBcUJBLE9BQU8sQ0FBUDs7QUFFckI7QUFDQSxNQUFNRyxTQUFTWixLQUFLYSxZQUFMLENBQWtCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzdDLFFBQU1DLGNBQWNDLE9BQU9DLE1BQVAsQ0FBYztBQUNoQ0gsY0FEZ0M7QUFFaENMLGdCQUZnQztBQUdoQ0QsZ0JBSGdDO0FBSWhDVSxjQUFRTCxJQUFJTSxVQUFKLENBQWVDLGFBSlM7QUFLaENDLFdBQUtDLFVBQVVULElBQUlRLEdBQWQ7QUFMMkIsS0FBZCxDQUFwQjtBQU9BUCxRQUFJUyxVQUFKLEdBQWlCLEdBQWpCO0FBQ0FULFFBQUlVLFNBQUosQ0FBYyxlQUFkLEVBQStCLFVBQS9CO0FBQ0FWLFFBQUlVLFNBQUosQ0FBYyxZQUFkLEVBQTRCLE9BQTVCO0FBQ0FyQixZQUFRc0IsT0FBUixDQUFnQixVQUFDQyxHQUFEO0FBQUEsYUFBU0EsSUFBSVgsV0FBSixDQUFUO0FBQUEsS0FBaEI7QUFDQUQsUUFBSWEsR0FBSjtBQUNELEdBYmMsQ0FBZjs7QUFlQWhCLFNBQU9pQixNQUFQLENBQWNwQixJQUFkLEVBQW9CQyxJQUFwQixFQUEwQixZQUFNO0FBQzlCQSxXQUFPRSxPQUFPa0IsT0FBUCxHQUFpQkEsT0FBeEI7QUFDQXJCLFdBQU9HLE9BQU9rQixPQUFQLEdBQWlCckIsSUFBeEI7QUFDQUUsZ0JBQVlBLFNBQVMsRUFBRUQsVUFBRixFQUFRRCxVQUFSLEVBQWNzQixTQUFTLElBQXZCLEVBQVQsQ0FBWjtBQUNELEdBSkQ7O0FBTUEsU0FBTyxVQUFDcEIsUUFBRCxFQUFjO0FBQ25CcUIsWUFBUUMsVUFBUixJQUFzQkQsUUFBUUMsVUFBUixFQUF0QjtBQUNBckIsV0FBT3NCLFNBQVAsSUFBb0J0QixPQUFPdUIsS0FBUCxDQUFheEIsUUFBYixDQUFwQjtBQUNELEdBSEQ7QUFJRDs7QUFFRDtBQUNBeUIsT0FBT0MsT0FBUCxHQUFpQjtBQUNmOzs7Ozs7QUFNQTdCLGNBUGU7O0FBU2Y7Ozs7QUFJQUY7QUFiZSxDQUFqQiIsImZpbGUiOiJlY2hvLXdlYi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuLy8gRGVwZW5kZW5jaWVzXG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpXG5jb25zdCBhc0hUTUwgPSByZXF1aXJlKCcuL2xvZ2dlcnMvYXMtaHRtbCcpXG5jb25zdCB0b0NvbnNvbGUgPSByZXF1aXJlKCcuL2xvZ2dlcnMvdG8tY29uc29sZScpXG5cbi8vIERlZmF1bHQgTG9nZ2Vyc1xuY29uc3QgbG9nZ2VycyA9IFtdLnB1c2godG9Db25zb2xlLCBhc0hUTUwpXG5jb25zdCBhZGRMb2dnZXIgPSBsb2dnZXJzLnB1c2guYmluZChsb2dnZXJzKVxuXG4vLyBTZXJ2ZXIgQ29uZmlnXG5mdW5jdGlvbiBzdGFydCAocG9ydCA9ICc4MDgwJywgaG9zdCA9ICcwLjAuMC4wJywgY2FsbGJhY2spIHtcbiAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSBmb3IgYW4gYXV0by1wb3J0LlxuICBpZiAocG9ydCA9PT0gJ2F1dG8nKSBwb3J0ID0gMFxuXG4gIC8vIENyZWF0ZSB0aGUgc2VydmVyIHdlJ3JlIHN0YXJ0aW5nLlxuICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgcmVzLFxuICAgICAgaG9zdCxcbiAgICAgIHBvcnQsXG4gICAgICBjbGllbnQ6IHJlcS5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MsXG4gICAgICB1cmw6IGRlY29kZVVSSShyZXEudXJsKVxuICAgIH0pXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDRcbiAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ25vLWNhY2hlJylcbiAgICByZXMuc2V0SGVhZGVyKCdDb25uZWN0aW9uJywgJ2Nsb3NlJylcbiAgICBsb2dnZXJzLmZvckVhY2goKGxvZykgPT4gbG9nKHJlcXVlc3RJbmZvKSlcbiAgICByZXMuZW5kKClcbiAgfSlcblxuICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3QsICgpID0+IHtcbiAgICBob3N0ID0gc2VydmVyLmFkZHJlc3MoKS5hZGRyZXNzXG4gICAgcG9ydCA9IHNlcnZlci5hZGRyZXNzKCkucG9ydFxuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHsgaG9zdCwgcG9ydCwgcnVubmluZzogdHJ1ZSB9KVxuICB9KVxuXG4gIHJldHVybiAoY2FsbGJhY2spID0+IHtcbiAgICBwcm9jZXNzLmRpc2Nvbm5lY3QgJiYgcHJvY2Vzcy5kaXNjb25uZWN0KClcbiAgICBzZXJ2ZXIubGlzdGVuaW5nICYmIHNlcnZlci5jbG9zZShjYWxsYmFjaylcbiAgfVxufVxuXG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHNlcnZlciBhdCB0aGUgcG9ydCBhbmQgaG9zdCBpbmRpY2F0ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcG9ydD0nODA4MCddIC0gT3BlbiBwb3J0IG9yICdhdXRvJyB0byBhc3NpZ24gYSByYW5kb20gZnJlZSBwb3J0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2hvc3Q9JzAuMC4wLjAnXSAtIElQIG9yIGhvc3QgbmFtZVxuICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IC0gU3RvcCB0aGlzIHNlcnZlciB0aGVuIGV4ZWN1dGUgYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBzdGFydCxcblxuICAvKipcbiAgICogQWRkcyBhIGxvZ2dpbmcgZnVuY3Rpb24gdGhhdCB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgbm90aWZpZWQgb2YgbmV3XG4gICAqIHJlcXVlc3RzLlxuICAgKi9cbiAgYWRkTG9nZ2VyXG59XG5cbiJdfQ==