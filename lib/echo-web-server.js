'use strict';

// Dependencies

var http = require('http');

// Server Config
function start() {
  var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0.0';
  var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '8080';
  var callback = arguments[2];

  // Handle special case for an auto-port.
  if (port === 'auto') port = 0;

  // Unless it has loggers, our server won't do anything.
  var loggers = [];

  var addLogger = loggers.push.bind(loggers);

  var server = http.createServer(function (req, res) {
    var requestInfo = Object.freeze({
      req: req,
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

  function stop(callback) {
    process.disconnect && process.disconnect();
    server.listening && server.close(callback);
  }

  return { addLogger: addLogger, stop: stop };
}

// Exports
module.exports = {
  start: start
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJzdGFydCIsImhvc3QiLCJwb3J0IiwiY2FsbGJhY2siLCJsb2dnZXJzIiwiYWRkTG9nZ2VyIiwicHVzaCIsImJpbmQiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJyZXEiLCJyZXMiLCJyZXF1ZXN0SW5mbyIsIk9iamVjdCIsImZyZWV6ZSIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJyZW1vdGVBZGRyZXNzIiwidXJsIiwiZGVjb2RlVVJJIiwic3RhdHVzQ29kZSIsInNldEhlYWRlciIsImZvckVhY2giLCJsb2ciLCJlbmQiLCJsaXN0ZW4iLCJhZGRyZXNzIiwicnVubmluZyIsInN0b3AiLCJwcm9jZXNzIiwiZGlzY29ubmVjdCIsImxpc3RlbmluZyIsImNsb3NlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUE7QUFDQSxTQUFTQyxLQUFULEdBQTJEO0FBQUEsTUFBM0NDLElBQTJDLHVFQUFwQyxTQUFvQztBQUFBLE1BQXpCQyxJQUF5Qix1RUFBbEIsTUFBa0I7QUFBQSxNQUFWQyxRQUFVOztBQUN6RDtBQUNBLE1BQUlELFNBQVMsTUFBYixFQUFxQkEsT0FBTyxDQUFQOztBQUVyQjtBQUNBLE1BQU1FLFVBQVUsRUFBaEI7O0FBRUEsTUFBTUMsWUFBWUQsUUFBUUUsSUFBUixDQUFhQyxJQUFiLENBQWtCSCxPQUFsQixDQUFsQjs7QUFFQSxNQUFNSSxTQUFTVixLQUFLVyxZQUFMLENBQWtCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzdDLFFBQU1DLGNBQWNDLE9BQU9DLE1BQVAsQ0FBYztBQUNoQ0osY0FEZ0M7QUFFaENDLGNBRmdDO0FBR2hDVixnQkFIZ0M7QUFJaENDLGdCQUpnQztBQUtoQ2EsY0FBUUwsSUFBSU0sVUFBSixDQUFlQyxhQUxTO0FBTWhDQyxXQUFLQyxVQUFVVCxJQUFJUSxHQUFkO0FBTjJCLEtBQWQsQ0FBcEI7QUFRQVAsUUFBSVMsVUFBSixHQUFpQixHQUFqQjtBQUNBVCxRQUFJVSxTQUFKLENBQWMsZUFBZCxFQUErQixVQUEvQjtBQUNBVixRQUFJVSxTQUFKLENBQWMsWUFBZCxFQUE0QixPQUE1QjtBQUNBakIsWUFBUWtCLE9BQVIsQ0FBZ0IsVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLElBQUlYLFdBQUosQ0FBVDtBQUFBLEtBQWhCO0FBQ0FELFFBQUlhLEdBQUo7QUFDRCxHQWRjLENBQWY7O0FBZ0JBaEIsU0FBT2lCLE1BQVAsQ0FBY3ZCLElBQWQsRUFBb0JELElBQXBCLEVBQTBCLFlBQU07QUFDOUJBLFdBQU9PLE9BQU9rQixPQUFQLEdBQWlCQSxPQUF4QjtBQUNBeEIsV0FBT00sT0FBT2tCLE9BQVAsR0FBaUJ4QixJQUF4QjtBQUNBQyxnQkFBWUEsU0FBUyxFQUFFRixVQUFGLEVBQVFDLFVBQVIsRUFBY3lCLFNBQVMsSUFBdkIsRUFBVCxDQUFaO0FBQ0QsR0FKRDs7QUFNQSxXQUFTQyxJQUFULENBQWV6QixRQUFmLEVBQXlCO0FBQ3ZCMEIsWUFBUUMsVUFBUixJQUFzQkQsUUFBUUMsVUFBUixFQUF0QjtBQUNBdEIsV0FBT3VCLFNBQVAsSUFBb0J2QixPQUFPd0IsS0FBUCxDQUFhN0IsUUFBYixDQUFwQjtBQUNEOztBQUVELFNBQU8sRUFBRUUsb0JBQUYsRUFBYXVCLFVBQWIsRUFBUDtBQUNEOztBQUVEO0FBQ0FLLE9BQU9DLE9BQVAsR0FBaUI7QUFDZmxDO0FBRGUsQ0FBakIiLCJmaWxlIjoiZWNoby13ZWItc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbi8vIERlcGVuZGVuY2llc1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKVxuXG4vLyBTZXJ2ZXIgQ29uZmlnXG5mdW5jdGlvbiBzdGFydCAoaG9zdCA9ICcwLjAuMC4wJywgcG9ydCA9ICc4MDgwJywgY2FsbGJhY2spIHtcbiAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSBmb3IgYW4gYXV0by1wb3J0LlxuICBpZiAocG9ydCA9PT0gJ2F1dG8nKSBwb3J0ID0gMFxuXG4gIC8vIFVubGVzcyBpdCBoYXMgbG9nZ2Vycywgb3VyIHNlcnZlciB3b24ndCBkbyBhbnl0aGluZy5cbiAgY29uc3QgbG9nZ2VycyA9IFtdXG5cbiAgY29uc3QgYWRkTG9nZ2VyID0gbG9nZ2Vycy5wdXNoLmJpbmQobG9nZ2VycylcblxuICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgcmVxLFxuICAgICAgcmVzLFxuICAgICAgaG9zdCxcbiAgICAgIHBvcnQsXG4gICAgICBjbGllbnQ6IHJlcS5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MsXG4gICAgICB1cmw6IGRlY29kZVVSSShyZXEudXJsKVxuICAgIH0pXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDRcbiAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ25vLWNhY2hlJylcbiAgICByZXMuc2V0SGVhZGVyKCdDb25uZWN0aW9uJywgJ2Nsb3NlJylcbiAgICBsb2dnZXJzLmZvckVhY2goKGxvZykgPT4gbG9nKHJlcXVlc3RJbmZvKSlcbiAgICByZXMuZW5kKClcbiAgfSlcblxuICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3QsICgpID0+IHtcbiAgICBob3N0ID0gc2VydmVyLmFkZHJlc3MoKS5hZGRyZXNzXG4gICAgcG9ydCA9IHNlcnZlci5hZGRyZXNzKCkucG9ydFxuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHsgaG9zdCwgcG9ydCwgcnVubmluZzogdHJ1ZSB9KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGNhbGxiYWNrKSB7XG4gICAgcHJvY2Vzcy5kaXNjb25uZWN0ICYmIHByb2Nlc3MuZGlzY29ubmVjdCgpXG4gICAgc2VydmVyLmxpc3RlbmluZyAmJiBzZXJ2ZXIuY2xvc2UoY2FsbGJhY2spXG4gIH1cblxuICByZXR1cm4geyBhZGRMb2dnZXIsIHN0b3AgfVxufVxuXG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RhcnRcbn1cblxuIl19