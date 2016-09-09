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
   * @param {string} [port='8080'] - Open port or 'auto' to assign a random free port.
   * @param {string} [host='0.0.0.0'] - IP or host name
   * @returns {function} - Stop this server then execute an optional callback function.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJzdGFydCIsInBvcnQiLCJob3N0IiwiY2FsbGJhY2siLCJsb2dnZXJzIiwiYWRkTG9nZ2VyIiwicHVzaCIsImJpbmQiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJyZXEiLCJyZXMiLCJyZXF1ZXN0SW5mbyIsIk9iamVjdCIsImZyZWV6ZSIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJyZW1vdGVBZGRyZXNzIiwidXJsIiwiZGVjb2RlVVJJIiwic3RhdHVzQ29kZSIsInNldEhlYWRlciIsImZvckVhY2giLCJsb2ciLCJlbmQiLCJsaXN0ZW4iLCJhZGRyZXNzIiwicnVubmluZyIsInN0b3AiLCJwcm9jZXNzIiwiZGlzY29ubmVjdCIsImxpc3RlbmluZyIsImNsb3NlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUE7QUFDQSxTQUFTQyxLQUFULEdBQTJEO0FBQUEsTUFBM0NDLElBQTJDLHlEQUFwQyxNQUFvQztBQUFBLE1BQTVCQyxJQUE0Qix5REFBckIsU0FBcUI7QUFBQSxNQUFWQyxRQUFVOztBQUN6RDtBQUNBLE1BQUlGLFNBQVMsTUFBYixFQUFxQkEsT0FBTyxDQUFQOztBQUVyQjtBQUNBLE1BQU1HLFVBQVUsRUFBaEI7O0FBRUE7Ozs7O0FBS0EsTUFBTUMsWUFBWUQsUUFBUUUsSUFBUixDQUFhQyxJQUFiLENBQWtCSCxPQUFsQixDQUFsQjs7QUFFQTs7Ozs7O0FBTUEsTUFBTUksU0FBU1YsS0FBS1csWUFBTCxDQUFrQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUM3QyxRQUFNQyxjQUFjQyxPQUFPQyxNQUFQLENBQWM7QUFDaENILGNBRGdDO0FBRWhDVCxnQkFGZ0M7QUFHaENELGdCQUhnQztBQUloQ2MsY0FBUUwsSUFBSU0sVUFBSixDQUFlQyxhQUpTO0FBS2hDQyxXQUFLQyxVQUFVVCxJQUFJUSxHQUFkO0FBTDJCLEtBQWQsQ0FBcEI7QUFPQVAsUUFBSVMsVUFBSixHQUFpQixHQUFqQjtBQUNBVCxRQUFJVSxTQUFKLENBQWMsZUFBZCxFQUErQixVQUEvQjtBQUNBVixRQUFJVSxTQUFKLENBQWMsWUFBZCxFQUE0QixPQUE1QjtBQUNBakIsWUFBUWtCLE9BQVIsQ0FBZ0IsVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLElBQUlYLFdBQUosQ0FBVDtBQUFBLEtBQWhCO0FBQ0FELFFBQUlhLEdBQUo7QUFDRCxHQWJjLENBQWY7O0FBZUFoQixTQUFPaUIsTUFBUCxDQUFjeEIsSUFBZCxFQUFvQkMsSUFBcEIsRUFBMEIsWUFBTTtBQUM5QkEsV0FBT00sT0FBT2tCLE9BQVAsR0FBaUJBLE9BQXhCO0FBQ0F6QixXQUFPTyxPQUFPa0IsT0FBUCxHQUFpQnpCLElBQXhCO0FBQ0FFLGdCQUFZQSxTQUFTLEVBQUVELFVBQUYsRUFBUUQsVUFBUixFQUFjMEIsU0FBUyxJQUF2QixFQUFULENBQVo7QUFDRCxHQUpEOztBQU1BLFNBQU87QUFDTHRCLHdCQURLO0FBRUx1QixRQUZLLGdCQUVDekIsUUFGRCxFQUVXO0FBQ2QwQixjQUFRQyxVQUFSLElBQXNCRCxRQUFRQyxVQUFSLEVBQXRCO0FBQ0F0QixhQUFPdUIsU0FBUCxJQUFvQnZCLE9BQU93QixLQUFQLENBQWE3QixRQUFiLENBQXBCO0FBQ0Q7QUFMSSxHQUFQO0FBT0Q7O0FBRUQ7QUFDQThCLE9BQU9DLE9BQVAsR0FBaUI7QUFDZmxDO0FBRGUsQ0FBakIiLCJmaWxlIjoiZWNoby13ZWItc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbi8vIERlcGVuZGVuY2llc1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKVxuXG4vLyBTZXJ2ZXIgQ29uZmlnXG5mdW5jdGlvbiBzdGFydCAocG9ydCA9ICc4MDgwJywgaG9zdCA9ICcwLjAuMC4wJywgY2FsbGJhY2spIHtcbiAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSBmb3IgYW4gYXV0by1wb3J0LlxuICBpZiAocG9ydCA9PT0gJ2F1dG8nKSBwb3J0ID0gMFxuXG4gIC8vIFVubGVzcyBpdCBoYXMgbG9nZ2Vycywgb3VyIHNlcnZlciB3b24ndCBkbyBhbnl0aGluZy5cbiAgY29uc3QgbG9nZ2VycyA9IFtdXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBsb2dnaW5nIGZ1bmN0aW9uLiBXaXRob3V0IGF0IGxlYXN0IG9uZSBsb2dnaW5nIGZ1bmN0aW9uLCB0aGUgc2VydmVyXG4gICAqIHdpbGwgbm90IGRvIGFueXRoaW5nLiBXaGVuIHdlIHJlY2lldmUgYSByZXF1ZXN0LCB0aGUgc2VydmVyIHdpbGwgcGFzcyBhXG4gICAqIGByZXF1ZXN0SW5mb2Agb2JqZWN0IHRvIGV2ZXJ5IHJlZ2lzdGVyZWQgbG9nZ2VyLlxuICAgKi9cbiAgY29uc3QgYWRkTG9nZ2VyID0gbG9nZ2Vycy5wdXNoLmJpbmQobG9nZ2VycylcblxuICAvKipcbiAgICogU3RhcnRzIGEgc2VydmVyIGF0IHRoZSBwb3J0IGFuZCBob3N0IGluZGljYXRlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtwb3J0PSc4MDgwJ10gLSBPcGVuIHBvcnQgb3IgJ2F1dG8nIHRvIGFzc2lnbiBhIHJhbmRvbSBmcmVlIHBvcnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaG9zdD0nMC4wLjAuMCddIC0gSVAgb3IgaG9zdCBuYW1lXG4gICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBTdG9wIHRoaXMgc2VydmVyIHRoZW4gZXhlY3V0ZSBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIGNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICByZXMsXG4gICAgICBob3N0LFxuICAgICAgcG9ydCxcbiAgICAgIGNsaWVudDogcmVxLmNvbm5lY3Rpb24ucmVtb3RlQWRkcmVzcyxcbiAgICAgIHVybDogZGVjb2RlVVJJKHJlcS51cmwpXG4gICAgfSlcbiAgICByZXMuc3RhdHVzQ29kZSA9IDQwNFxuICAgIHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tY2FjaGUnKVxuICAgIHJlcy5zZXRIZWFkZXIoJ0Nvbm5lY3Rpb24nLCAnY2xvc2UnKVxuICAgIGxvZ2dlcnMuZm9yRWFjaCgobG9nKSA9PiBsb2cocmVxdWVzdEluZm8pKVxuICAgIHJlcy5lbmQoKVxuICB9KVxuXG4gIHNlcnZlci5saXN0ZW4ocG9ydCwgaG9zdCwgKCkgPT4ge1xuICAgIGhvc3QgPSBzZXJ2ZXIuYWRkcmVzcygpLmFkZHJlc3NcbiAgICBwb3J0ID0gc2VydmVyLmFkZHJlc3MoKS5wb3J0XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soeyBob3N0LCBwb3J0LCBydW5uaW5nOiB0cnVlIH0pXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhZGRMb2dnZXIsXG4gICAgc3RvcCAoY2FsbGJhY2spIHtcbiAgICAgIHByb2Nlc3MuZGlzY29ubmVjdCAmJiBwcm9jZXNzLmRpc2Nvbm5lY3QoKVxuICAgICAgc2VydmVyLmxpc3RlbmluZyAmJiBzZXJ2ZXIuY2xvc2UoY2FsbGJhY2spXG4gICAgfVxuICB9XG59XG5cbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzdGFydFxufVxuXG4iXX0=