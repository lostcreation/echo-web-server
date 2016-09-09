'use strict';

// Dependencies

var http = require('http');

// Server Config
function start() {
  var port = arguments.length <= 0 || arguments[0] === undefined ? '8080' : arguments[0];
  var host = arguments.length <= 1 || arguments[1] === undefined ? '0.0.0.0' : arguments[1];
  var callback = arguments[2];

  // Handle special case for an auto-port.
  if (port === 'auto') port = 0;

  // Unless it has loggers, our server won't do anything.
  var loggers = [];

  /**
   * Adds a logging function. Without at least one logging function, the server
   * will not do anything. When we recieve a request, the server will pass a
   * `requestInfo` object to every registered logger.
   */
  var addLogger = loggers.push.bind(loggers);

  /**
   * Starts a server at the port and host indicated.
   * @param {string} [port='8080'] - Open port or 'auto' to assign a random
   *    free port.
   * @param {string} [host='0.0.0.0'] - IP or host name
   * @returns {function} - Stop this server then execute an optional callback
   *    function.
   */
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

  return {
    addLogger: addLogger,
    stop: function stop(callback) {
      process.disconnect && process.disconnect();
      server.listening && server.close(callback);
    }
  };
}

// Exports
module.exports = {
  start: start
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJzdGFydCIsInBvcnQiLCJob3N0IiwiY2FsbGJhY2siLCJsb2dnZXJzIiwiYWRkTG9nZ2VyIiwicHVzaCIsImJpbmQiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJyZXEiLCJyZXMiLCJyZXF1ZXN0SW5mbyIsIk9iamVjdCIsImZyZWV6ZSIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJyZW1vdGVBZGRyZXNzIiwidXJsIiwiZGVjb2RlVVJJIiwic3RhdHVzQ29kZSIsInNldEhlYWRlciIsImZvckVhY2giLCJsb2ciLCJlbmQiLCJsaXN0ZW4iLCJhZGRyZXNzIiwicnVubmluZyIsInN0b3AiLCJwcm9jZXNzIiwiZGlzY29ubmVjdCIsImxpc3RlbmluZyIsImNsb3NlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUE7QUFDQSxTQUFTQyxLQUFULEdBQTJEO0FBQUEsTUFBM0NDLElBQTJDLHlEQUFwQyxNQUFvQztBQUFBLE1BQTVCQyxJQUE0Qix5REFBckIsU0FBcUI7QUFBQSxNQUFWQyxRQUFVOztBQUN6RDtBQUNBLE1BQUlGLFNBQVMsTUFBYixFQUFxQkEsT0FBTyxDQUFQOztBQUVyQjtBQUNBLE1BQU1HLFVBQVUsRUFBaEI7O0FBRUE7Ozs7O0FBS0EsTUFBTUMsWUFBWUQsUUFBUUUsSUFBUixDQUFhQyxJQUFiLENBQWtCSCxPQUFsQixDQUFsQjs7QUFFQTs7Ozs7Ozs7QUFRQSxNQUFNSSxTQUFTVixLQUFLVyxZQUFMLENBQWtCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzdDLFFBQU1DLGNBQWNDLE9BQU9DLE1BQVAsQ0FBYztBQUNoQ0gsY0FEZ0M7QUFFaENULGdCQUZnQztBQUdoQ0QsZ0JBSGdDO0FBSWhDYyxjQUFRTCxJQUFJTSxVQUFKLENBQWVDLGFBSlM7QUFLaENDLFdBQUtDLFVBQVVULElBQUlRLEdBQWQ7QUFMMkIsS0FBZCxDQUFwQjtBQU9BUCxRQUFJUyxVQUFKLEdBQWlCLEdBQWpCO0FBQ0FULFFBQUlVLFNBQUosQ0FBYyxlQUFkLEVBQStCLFVBQS9CO0FBQ0FWLFFBQUlVLFNBQUosQ0FBYyxZQUFkLEVBQTRCLE9BQTVCO0FBQ0FqQixZQUFRa0IsT0FBUixDQUFnQixVQUFDQyxHQUFEO0FBQUEsYUFBU0EsSUFBSVgsV0FBSixDQUFUO0FBQUEsS0FBaEI7QUFDQUQsUUFBSWEsR0FBSjtBQUNELEdBYmMsQ0FBZjs7QUFlQWhCLFNBQU9pQixNQUFQLENBQWN4QixJQUFkLEVBQW9CQyxJQUFwQixFQUEwQixZQUFNO0FBQzlCQSxXQUFPTSxPQUFPa0IsT0FBUCxHQUFpQkEsT0FBeEI7QUFDQXpCLFdBQU9PLE9BQU9rQixPQUFQLEdBQWlCekIsSUFBeEI7QUFDQUUsZ0JBQVlBLFNBQVMsRUFBRUQsVUFBRixFQUFRRCxVQUFSLEVBQWMwQixTQUFTLElBQXZCLEVBQVQsQ0FBWjtBQUNELEdBSkQ7O0FBTUEsU0FBTztBQUNMdEIsd0JBREs7QUFFTHVCLFFBRkssZ0JBRUN6QixRQUZELEVBRVc7QUFDZDBCLGNBQVFDLFVBQVIsSUFBc0JELFFBQVFDLFVBQVIsRUFBdEI7QUFDQXRCLGFBQU91QixTQUFQLElBQW9CdkIsT0FBT3dCLEtBQVAsQ0FBYTdCLFFBQWIsQ0FBcEI7QUFDRDtBQUxJLEdBQVA7QUFPRDs7QUFFRDtBQUNBOEIsT0FBT0MsT0FBUCxHQUFpQjtBQUNmbEM7QUFEZSxDQUFqQiIsImZpbGUiOiJlY2hvLXdlYi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuLy8gRGVwZW5kZW5jaWVzXG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpXG5cbi8vIFNlcnZlciBDb25maWdcbmZ1bmN0aW9uIHN0YXJ0IChwb3J0ID0gJzgwODAnLCBob3N0ID0gJzAuMC4wLjAnLCBjYWxsYmFjaykge1xuICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlIGZvciBhbiBhdXRvLXBvcnQuXG4gIGlmIChwb3J0ID09PSAnYXV0bycpIHBvcnQgPSAwXG5cbiAgLy8gVW5sZXNzIGl0IGhhcyBsb2dnZXJzLCBvdXIgc2VydmVyIHdvbid0IGRvIGFueXRoaW5nLlxuICBjb25zdCBsb2dnZXJzID0gW11cblxuICAvKipcbiAgICogQWRkcyBhIGxvZ2dpbmcgZnVuY3Rpb24uIFdpdGhvdXQgYXQgbGVhc3Qgb25lIGxvZ2dpbmcgZnVuY3Rpb24sIHRoZSBzZXJ2ZXJcbiAgICogd2lsbCBub3QgZG8gYW55dGhpbmcuIFdoZW4gd2UgcmVjaWV2ZSBhIHJlcXVlc3QsIHRoZSBzZXJ2ZXIgd2lsbCBwYXNzIGFcbiAgICogYHJlcXVlc3RJbmZvYCBvYmplY3QgdG8gZXZlcnkgcmVnaXN0ZXJlZCBsb2dnZXIuXG4gICAqL1xuICBjb25zdCBhZGRMb2dnZXIgPSBsb2dnZXJzLnB1c2guYmluZChsb2dnZXJzKVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYSBzZXJ2ZXIgYXQgdGhlIHBvcnQgYW5kIGhvc3QgaW5kaWNhdGVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BvcnQ9JzgwODAnXSAtIE9wZW4gcG9ydCBvciAnYXV0bycgdG8gYXNzaWduIGEgcmFuZG9tXG4gICAqICAgIGZyZWUgcG9ydC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtob3N0PScwLjAuMC4wJ10gLSBJUCBvciBob3N0IG5hbWVcbiAgICogQHJldHVybnMge2Z1bmN0aW9ufSAtIFN0b3AgdGhpcyBzZXJ2ZXIgdGhlbiBleGVjdXRlIGFuIG9wdGlvbmFsIGNhbGxiYWNrXG4gICAqICAgIGZ1bmN0aW9uLlxuICAgKi9cbiAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBPYmplY3QuZnJlZXplKHtcbiAgICAgIHJlcyxcbiAgICAgIGhvc3QsXG4gICAgICBwb3J0LFxuICAgICAgY2xpZW50OiByZXEuY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzLFxuICAgICAgdXJsOiBkZWNvZGVVUkkocmVxLnVybClcbiAgICB9KVxuICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0XG4gICAgcmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICduby1jYWNoZScpXG4gICAgcmVzLnNldEhlYWRlcignQ29ubmVjdGlvbicsICdjbG9zZScpXG4gICAgbG9nZ2Vycy5mb3JFYWNoKChsb2cpID0+IGxvZyhyZXF1ZXN0SW5mbykpXG4gICAgcmVzLmVuZCgpXG4gIH0pXG5cbiAgc2VydmVyLmxpc3Rlbihwb3J0LCBob3N0LCAoKSA9PiB7XG4gICAgaG9zdCA9IHNlcnZlci5hZGRyZXNzKCkuYWRkcmVzc1xuICAgIHBvcnQgPSBzZXJ2ZXIuYWRkcmVzcygpLnBvcnRcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh7IGhvc3QsIHBvcnQsIHJ1bm5pbmc6IHRydWUgfSlcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGFkZExvZ2dlcixcbiAgICBzdG9wIChjYWxsYmFjaykge1xuICAgICAgcHJvY2Vzcy5kaXNjb25uZWN0ICYmIHByb2Nlc3MuZGlzY29ubmVjdCgpXG4gICAgICBzZXJ2ZXIubGlzdGVuaW5nICYmIHNlcnZlci5jbG9zZShjYWxsYmFjaylcbiAgICB9XG4gIH1cbn1cblxuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0YXJ0XG59XG5cbiJdfQ==