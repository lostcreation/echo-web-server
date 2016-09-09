'use strict';

// Dependencies

var http = require('http');
var asHTML = require('./loggers/as-html');
var toConsole = require('./loggers/to-console');

// Exports
module.exports = {
  start: start,
  toConsole: toConsole,
  asHTML: asHTML,
  addLogger: addLogger
};

// Default Loggers
var loggers = [];
addLogger(toConsole);
addLogger(asHTML);

/**
 * Starts a server at the port and host indicated.
 * @param {string} [port='8080'] - Open port or 'auto' to assign a random free port.
 * @param {string} [host='0.0.0.0'] - IP or host name
 * @returns {function} - Stop this server then execute an optional callback function.
 */
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

/**
 * Adds a logging function that will automatically be notified of new
 * requests.
 */
function addLogger(logger) {
  loggers.push(logger);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJhc0hUTUwiLCJ0b0NvbnNvbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwic3RhcnQiLCJhZGRMb2dnZXIiLCJsb2dnZXJzIiwicG9ydCIsImhvc3QiLCJjYWxsYmFjayIsInNlcnZlciIsImNyZWF0ZVNlcnZlciIsInJlcSIsInJlcyIsInJlcXVlc3RJbmZvIiwiT2JqZWN0IiwiZnJlZXplIiwiY2xpZW50IiwiY29ubmVjdGlvbiIsInJlbW90ZUFkZHJlc3MiLCJ1cmwiLCJkZWNvZGVVUkkiLCJzdGF0dXNDb2RlIiwic2V0SGVhZGVyIiwiZm9yRWFjaCIsImxvZyIsImVuZCIsImxpc3RlbiIsImFkZHJlc3MiLCJydW5uaW5nIiwicHJvY2VzcyIsImRpc2Nvbm5lY3QiLCJsaXN0ZW5pbmciLCJjbG9zZSIsImxvZ2dlciIsInB1c2giXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUNBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxtQkFBUixDQUFmO0FBQ0EsSUFBTUUsWUFBWUYsUUFBUSxzQkFBUixDQUFsQjs7QUFFQTtBQUNBRyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGNBRGU7QUFFZkgsc0JBRmU7QUFHZkQsZ0JBSGU7QUFJZks7QUFKZSxDQUFqQjs7QUFPQTtBQUNBLElBQU1DLFVBQVUsRUFBaEI7QUFDQUQsVUFBVUosU0FBVjtBQUNBSSxVQUFVTCxNQUFWOztBQUVBOzs7Ozs7QUFNQSxTQUFTSSxLQUFULEdBQTJEO0FBQUEsTUFBM0NHLElBQTJDLHlEQUFwQyxNQUFvQztBQUFBLE1BQTVCQyxJQUE0Qix5REFBckIsU0FBcUI7QUFBQSxNQUFWQyxRQUFVOztBQUN6RDtBQUNBLE1BQUlGLFNBQVMsTUFBYixFQUFxQkEsT0FBTyxDQUFQOztBQUVyQjtBQUNBLE1BQU1HLFNBQVNaLEtBQUthLFlBQUwsQ0FBa0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDN0MsUUFBTUMsY0FBY0MsT0FBT0MsTUFBUCxDQUFjO0FBQ2hDSCxjQURnQztBQUVoQ0wsZ0JBRmdDO0FBR2hDRCxnQkFIZ0M7QUFJaENVLGNBQVFMLElBQUlNLFVBQUosQ0FBZUMsYUFKUztBQUtoQ0MsV0FBS0MsVUFBVVQsSUFBSVEsR0FBZDtBQUwyQixLQUFkLENBQXBCO0FBT0FQLFFBQUlTLFVBQUosR0FBaUIsR0FBakI7QUFDQVQsUUFBSVUsU0FBSixDQUFjLGVBQWQsRUFBK0IsVUFBL0I7QUFDQVYsUUFBSVUsU0FBSixDQUFjLFlBQWQsRUFBNEIsT0FBNUI7QUFDQWpCLFlBQVFrQixPQUFSLENBQWdCLFVBQUNDLEdBQUQ7QUFBQSxhQUFTQSxJQUFJWCxXQUFKLENBQVQ7QUFBQSxLQUFoQjtBQUNBRCxRQUFJYSxHQUFKO0FBQ0QsR0FiYyxDQUFmOztBQWVBaEIsU0FBT2lCLE1BQVAsQ0FBY3BCLElBQWQsRUFBb0JDLElBQXBCLEVBQTBCLFlBQU07QUFDOUJBLFdBQU9FLE9BQU9rQixPQUFQLEdBQWlCQSxPQUF4QjtBQUNBckIsV0FBT0csT0FBT2tCLE9BQVAsR0FBaUJyQixJQUF4QjtBQUNBRSxnQkFBWUEsU0FBUyxFQUFFRCxVQUFGLEVBQVFELFVBQVIsRUFBY3NCLFNBQVMsSUFBdkIsRUFBVCxDQUFaO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLFVBQUNwQixRQUFELEVBQWM7QUFDbkJxQixZQUFRQyxVQUFSLElBQXNCRCxRQUFRQyxVQUFSLEVBQXRCO0FBQ0FyQixXQUFPc0IsU0FBUCxJQUFvQnRCLE9BQU91QixLQUFQLENBQWF4QixRQUFiLENBQXBCO0FBQ0QsR0FIRDtBQUlEOztBQUVEOzs7O0FBSUEsU0FBU0osU0FBVCxDQUFvQjZCLE1BQXBCLEVBQTRCO0FBQzFCNUIsVUFBUTZCLElBQVIsQ0FBYUQsTUFBYjtBQUNEIiwiZmlsZSI6ImVjaG8td2ViLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG4vLyBEZXBlbmRlbmNpZXNcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJylcbmNvbnN0IGFzSFRNTCA9IHJlcXVpcmUoJy4vbG9nZ2Vycy9hcy1odG1sJylcbmNvbnN0IHRvQ29uc29sZSA9IHJlcXVpcmUoJy4vbG9nZ2Vycy90by1jb25zb2xlJylcblxuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0YXJ0LFxuICB0b0NvbnNvbGUsXG4gIGFzSFRNTCxcbiAgYWRkTG9nZ2VyXG59XG5cbi8vIERlZmF1bHQgTG9nZ2Vyc1xuY29uc3QgbG9nZ2VycyA9IFtdXG5hZGRMb2dnZXIodG9Db25zb2xlKVxuYWRkTG9nZ2VyKGFzSFRNTClcblxuLyoqXG4gKiBTdGFydHMgYSBzZXJ2ZXIgYXQgdGhlIHBvcnQgYW5kIGhvc3QgaW5kaWNhdGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IFtwb3J0PSc4MDgwJ10gLSBPcGVuIHBvcnQgb3IgJ2F1dG8nIHRvIGFzc2lnbiBhIHJhbmRvbSBmcmVlIHBvcnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2hvc3Q9JzAuMC4wLjAnXSAtIElQIG9yIGhvc3QgbmFtZVxuICogQHJldHVybnMge2Z1bmN0aW9ufSAtIFN0b3AgdGhpcyBzZXJ2ZXIgdGhlbiBleGVjdXRlIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBzdGFydCAocG9ydCA9ICc4MDgwJywgaG9zdCA9ICcwLjAuMC4wJywgY2FsbGJhY2spIHtcbiAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSBmb3IgYW4gYXV0by1wb3J0LlxuICBpZiAocG9ydCA9PT0gJ2F1dG8nKSBwb3J0ID0gMFxuXG4gIC8vIENyZWF0ZSB0aGUgc2VydmVyIHdlJ3JlIHN0YXJ0aW5nLlxuICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgcmVzLFxuICAgICAgaG9zdCxcbiAgICAgIHBvcnQsXG4gICAgICBjbGllbnQ6IHJlcS5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MsXG4gICAgICB1cmw6IGRlY29kZVVSSShyZXEudXJsKVxuICAgIH0pXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDRcbiAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ25vLWNhY2hlJylcbiAgICByZXMuc2V0SGVhZGVyKCdDb25uZWN0aW9uJywgJ2Nsb3NlJylcbiAgICBsb2dnZXJzLmZvckVhY2goKGxvZykgPT4gbG9nKHJlcXVlc3RJbmZvKSlcbiAgICByZXMuZW5kKClcbiAgfSlcblxuICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3QsICgpID0+IHtcbiAgICBob3N0ID0gc2VydmVyLmFkZHJlc3MoKS5hZGRyZXNzXG4gICAgcG9ydCA9IHNlcnZlci5hZGRyZXNzKCkucG9ydFxuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHsgaG9zdCwgcG9ydCwgcnVubmluZzogdHJ1ZSB9KVxuICB9KVxuXG4gIHJldHVybiAoY2FsbGJhY2spID0+IHtcbiAgICBwcm9jZXNzLmRpc2Nvbm5lY3QgJiYgcHJvY2Vzcy5kaXNjb25uZWN0KClcbiAgICBzZXJ2ZXIubGlzdGVuaW5nICYmIHNlcnZlci5jbG9zZShjYWxsYmFjaylcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYSBsb2dnaW5nIGZ1bmN0aW9uIHRoYXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIG5vdGlmaWVkIG9mIG5ld1xuICogcmVxdWVzdHMuXG4gKi9cbmZ1bmN0aW9uIGFkZExvZ2dlciAobG9nZ2VyKSB7XG4gIGxvZ2dlcnMucHVzaChsb2dnZXIpXG59XG4iXX0=