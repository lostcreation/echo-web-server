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
    var requestInfo = Object.freeze({ res: res, host: host, port: port,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJhc0hUTUwiLCJ0b0NvbnNvbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwic3RhcnQiLCJhZGRMb2dnZXIiLCJsb2dnZXJzIiwicG9ydCIsImhvc3QiLCJjYWxsYmFjayIsInNlcnZlciIsImNyZWF0ZVNlcnZlciIsInJlcSIsInJlcyIsInJlcXVlc3RJbmZvIiwiT2JqZWN0IiwiZnJlZXplIiwiY2xpZW50IiwiY29ubmVjdGlvbiIsInJlbW90ZUFkZHJlc3MiLCJ1cmwiLCJkZWNvZGVVUkkiLCJzdGF0dXNDb2RlIiwic2V0SGVhZGVyIiwiZm9yRWFjaCIsImxvZyIsImVuZCIsImxpc3RlbiIsImFkZHJlc3MiLCJydW5uaW5nIiwicHJvY2VzcyIsImRpc2Nvbm5lY3QiLCJsaXN0ZW5pbmciLCJjbG9zZSIsImxvZ2dlciIsInB1c2giXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUNBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxtQkFBUixDQUFmO0FBQ0EsSUFBTUUsWUFBWUYsUUFBUSxzQkFBUixDQUFsQjs7QUFFQTtBQUNBRyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGNBRGU7QUFFZkgsc0JBRmU7QUFHZkQsZ0JBSGU7QUFJZks7QUFKZSxDQUFqQjs7QUFPQTtBQUNBLElBQU1DLFVBQVUsRUFBaEI7QUFDQUQsVUFBVUosU0FBVjtBQUNBSSxVQUFVTCxNQUFWOztBQUVBOzs7Ozs7QUFNQSxTQUFTSSxLQUFULEdBQTJEO0FBQUEsTUFBM0NHLElBQTJDLHlEQUFwQyxNQUFvQztBQUFBLE1BQTVCQyxJQUE0Qix5REFBckIsU0FBcUI7QUFBQSxNQUFWQyxRQUFVOztBQUN6RDtBQUNBLE1BQUlGLFNBQVMsTUFBYixFQUFxQkEsT0FBTyxDQUFQOztBQUVyQjtBQUNBLE1BQU1HLFNBQVNaLEtBQUthLFlBQUwsQ0FBa0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDN0MsUUFBTUMsY0FBY0MsT0FBT0MsTUFBUCxDQUFjLEVBQUVILFFBQUYsRUFBT0wsVUFBUCxFQUFhRCxVQUFiO0FBQ2hDVSxjQUFRTCxJQUFJTSxVQUFKLENBQWVDLGFBRFM7QUFFaENDLFdBQUtDLFVBQVVULElBQUlRLEdBQWQ7QUFGMkIsS0FBZCxDQUFwQjtBQUlBUCxRQUFJUyxVQUFKLEdBQWlCLEdBQWpCO0FBQ0FULFFBQUlVLFNBQUosQ0FBYyxlQUFkLEVBQStCLFVBQS9CO0FBQ0FWLFFBQUlVLFNBQUosQ0FBYyxZQUFkLEVBQTRCLE9BQTVCO0FBQ0FqQixZQUFRa0IsT0FBUixDQUFnQixVQUFDQyxHQUFEO0FBQUEsYUFBU0EsSUFBSVgsV0FBSixDQUFUO0FBQUEsS0FBaEI7QUFDQUQsUUFBSWEsR0FBSjtBQUNELEdBVmMsQ0FBZjs7QUFZQWhCLFNBQU9pQixNQUFQLENBQWNwQixJQUFkLEVBQW9CQyxJQUFwQixFQUEwQixZQUFNO0FBQzlCQSxXQUFPRSxPQUFPa0IsT0FBUCxHQUFpQkEsT0FBeEI7QUFDQXJCLFdBQU9HLE9BQU9rQixPQUFQLEdBQWlCckIsSUFBeEI7QUFDQUUsZ0JBQVlBLFNBQVMsRUFBRUQsVUFBRixFQUFRRCxVQUFSLEVBQWNzQixTQUFTLElBQXZCLEVBQVQsQ0FBWjtBQUNELEdBSkQ7O0FBTUEsU0FBTyxVQUFDcEIsUUFBRCxFQUFjO0FBQ25CcUIsWUFBUUMsVUFBUixJQUFzQkQsUUFBUUMsVUFBUixFQUF0QjtBQUNBckIsV0FBT3NCLFNBQVAsSUFBb0J0QixPQUFPdUIsS0FBUCxDQUFheEIsUUFBYixDQUFwQjtBQUNELEdBSEQ7QUFJRDs7QUFFRDs7OztBQUlBLFNBQVNKLFNBQVQsQ0FBb0I2QixNQUFwQixFQUE0QjtBQUMxQjVCLFVBQVE2QixJQUFSLENBQWFELE1BQWI7QUFDRCIsImZpbGUiOiJlY2hvLXdlYi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuLy8gRGVwZW5kZW5jaWVzXG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpXG5jb25zdCBhc0hUTUwgPSByZXF1aXJlKCcuL2xvZ2dlcnMvYXMtaHRtbCcpXG5jb25zdCB0b0NvbnNvbGUgPSByZXF1aXJlKCcuL2xvZ2dlcnMvdG8tY29uc29sZScpXG5cbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzdGFydCxcbiAgdG9Db25zb2xlLFxuICBhc0hUTUwsXG4gIGFkZExvZ2dlclxufVxuXG4vLyBEZWZhdWx0IExvZ2dlcnNcbmNvbnN0IGxvZ2dlcnMgPSBbXVxuYWRkTG9nZ2VyKHRvQ29uc29sZSlcbmFkZExvZ2dlcihhc0hUTUwpXG5cbi8qKlxuICogU3RhcnRzIGEgc2VydmVyIGF0IHRoZSBwb3J0IGFuZCBob3N0IGluZGljYXRlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcG9ydD0nODA4MCddIC0gT3BlbiBwb3J0IG9yICdhdXRvJyB0byBhc3NpZ24gYSByYW5kb20gZnJlZSBwb3J0LlxuICogQHBhcmFtIHtzdHJpbmd9IFtob3N0PScwLjAuMC4wJ10gLSBJUCBvciBob3N0IG5hbWVcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBTdG9wIHRoaXMgc2VydmVyIHRoZW4gZXhlY3V0ZSBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gc3RhcnQgKHBvcnQgPSAnODA4MCcsIGhvc3QgPSAnMC4wLjAuMCcsIGNhbGxiYWNrKSB7XG4gIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2UgZm9yIGFuIGF1dG8tcG9ydC5cbiAgaWYgKHBvcnQgPT09ICdhdXRvJykgcG9ydCA9IDBcblxuICAvLyBDcmVhdGUgdGhlIHNlcnZlciB3ZSdyZSBzdGFydGluZy5cbiAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBPYmplY3QuZnJlZXplKHsgcmVzLCBob3N0LCBwb3J0LFxuICAgICAgY2xpZW50OiByZXEuY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzLFxuICAgICAgdXJsOiBkZWNvZGVVUkkocmVxLnVybClcbiAgICB9KVxuICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0XG4gICAgcmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICduby1jYWNoZScpXG4gICAgcmVzLnNldEhlYWRlcignQ29ubmVjdGlvbicsICdjbG9zZScpXG4gICAgbG9nZ2Vycy5mb3JFYWNoKChsb2cpID0+IGxvZyhyZXF1ZXN0SW5mbykpXG4gICAgcmVzLmVuZCgpXG4gIH0pXG5cbiAgc2VydmVyLmxpc3Rlbihwb3J0LCBob3N0LCAoKSA9PiB7XG4gICAgaG9zdCA9IHNlcnZlci5hZGRyZXNzKCkuYWRkcmVzc1xuICAgIHBvcnQgPSBzZXJ2ZXIuYWRkcmVzcygpLnBvcnRcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh7IGhvc3QsIHBvcnQsIHJ1bm5pbmc6IHRydWUgfSlcbiAgfSlcblxuICByZXR1cm4gKGNhbGxiYWNrKSA9PiB7XG4gICAgcHJvY2Vzcy5kaXNjb25uZWN0ICYmIHByb2Nlc3MuZGlzY29ubmVjdCgpXG4gICAgc2VydmVyLmxpc3RlbmluZyAmJiBzZXJ2ZXIuY2xvc2UoY2FsbGJhY2spXG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGEgbG9nZ2luZyBmdW5jdGlvbiB0aGF0IHdpbGwgYXV0b21hdGljYWxseSBiZSBub3RpZmllZCBvZiBuZXdcbiAqIHJlcXVlc3RzLlxuICovXG5mdW5jdGlvbiBhZGRMb2dnZXIgKGxvZ2dlcikge1xuICBsb2dnZXJzLnB1c2gobG9nZ2VyKVxufVxuIl19