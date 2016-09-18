'use strict';

// Dependencies

var http = require('http');

// Server Config
function start() {
  var host = arguments.length <= 0 || arguments[0] === undefined ? '0.0.0.0' : arguments[0];
  var port = arguments.length <= 1 || arguments[1] === undefined ? '8080' : arguments[1];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJzdGFydCIsImhvc3QiLCJwb3J0IiwiY2FsbGJhY2siLCJsb2dnZXJzIiwiYWRkTG9nZ2VyIiwicHVzaCIsImJpbmQiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJyZXEiLCJyZXMiLCJyZXF1ZXN0SW5mbyIsIk9iamVjdCIsImZyZWV6ZSIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJyZW1vdGVBZGRyZXNzIiwidXJsIiwiZGVjb2RlVVJJIiwic3RhdHVzQ29kZSIsInNldEhlYWRlciIsImZvckVhY2giLCJsb2ciLCJlbmQiLCJsaXN0ZW4iLCJhZGRyZXNzIiwicnVubmluZyIsInN0b3AiLCJwcm9jZXNzIiwiZGlzY29ubmVjdCIsImxpc3RlbmluZyIsImNsb3NlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUE7QUFDQSxTQUFTQyxLQUFULEdBQTJEO0FBQUEsTUFBM0NDLElBQTJDLHlEQUFwQyxTQUFvQztBQUFBLE1BQXpCQyxJQUF5Qix5REFBbEIsTUFBa0I7QUFBQSxNQUFWQyxRQUFVOztBQUN6RDtBQUNBLE1BQUlELFNBQVMsTUFBYixFQUFxQkEsT0FBTyxDQUFQOztBQUVyQjtBQUNBLE1BQU1FLFVBQVUsRUFBaEI7O0FBRUEsTUFBTUMsWUFBWUQsUUFBUUUsSUFBUixDQUFhQyxJQUFiLENBQWtCSCxPQUFsQixDQUFsQjs7QUFFQSxNQUFNSSxTQUFTVixLQUFLVyxZQUFMLENBQWtCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzdDLFFBQU1DLGNBQWNDLE9BQU9DLE1BQVAsQ0FBYztBQUNoQ0osY0FEZ0M7QUFFaENDLGNBRmdDO0FBR2hDVixnQkFIZ0M7QUFJaENDLGdCQUpnQztBQUtoQ2EsY0FBUUwsSUFBSU0sVUFBSixDQUFlQyxhQUxTO0FBTWhDQyxXQUFLQyxVQUFVVCxJQUFJUSxHQUFkO0FBTjJCLEtBQWQsQ0FBcEI7QUFRQVAsUUFBSVMsVUFBSixHQUFpQixHQUFqQjtBQUNBVCxRQUFJVSxTQUFKLENBQWMsZUFBZCxFQUErQixVQUEvQjtBQUNBVixRQUFJVSxTQUFKLENBQWMsWUFBZCxFQUE0QixPQUE1QjtBQUNBakIsWUFBUWtCLE9BQVIsQ0FBZ0IsVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLElBQUlYLFdBQUosQ0FBVDtBQUFBLEtBQWhCO0FBQ0FELFFBQUlhLEdBQUo7QUFDRCxHQWRjLENBQWY7O0FBZ0JBaEIsU0FBT2lCLE1BQVAsQ0FBY3ZCLElBQWQsRUFBb0JELElBQXBCLEVBQTBCLFlBQU07QUFDOUJBLFdBQU9PLE9BQU9rQixPQUFQLEdBQWlCQSxPQUF4QjtBQUNBeEIsV0FBT00sT0FBT2tCLE9BQVAsR0FBaUJ4QixJQUF4QjtBQUNBQyxnQkFBWUEsU0FBUyxFQUFFRixVQUFGLEVBQVFDLFVBQVIsRUFBY3lCLFNBQVMsSUFBdkIsRUFBVCxDQUFaO0FBQ0QsR0FKRDs7QUFNQSxXQUFTQyxJQUFULENBQWV6QixRQUFmLEVBQXlCO0FBQ3ZCMEIsWUFBUUMsVUFBUixJQUFzQkQsUUFBUUMsVUFBUixFQUF0QjtBQUNBdEIsV0FBT3VCLFNBQVAsSUFBb0J2QixPQUFPd0IsS0FBUCxDQUFhN0IsUUFBYixDQUFwQjtBQUNEOztBQUVELFNBQU8sRUFBRUUsb0JBQUYsRUFBYXVCLFVBQWIsRUFBUDtBQUNEOztBQUVEO0FBQ0FLLE9BQU9DLE9BQVAsR0FBaUI7QUFDZmxDO0FBRGUsQ0FBakIiLCJmaWxlIjoiZWNoby13ZWItc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBEZXBlbmRlbmNpZXNcclxuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKVxyXG5cclxuLy8gU2VydmVyIENvbmZpZ1xyXG5mdW5jdGlvbiBzdGFydCAoaG9zdCA9ICcwLjAuMC4wJywgcG9ydCA9ICc4MDgwJywgY2FsbGJhY2spIHtcclxuICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlIGZvciBhbiBhdXRvLXBvcnQuXHJcbiAgaWYgKHBvcnQgPT09ICdhdXRvJykgcG9ydCA9IDBcclxuXHJcbiAgLy8gVW5sZXNzIGl0IGhhcyBsb2dnZXJzLCBvdXIgc2VydmVyIHdvbid0IGRvIGFueXRoaW5nLlxyXG4gIGNvbnN0IGxvZ2dlcnMgPSBbXVxyXG5cclxuICBjb25zdCBhZGRMb2dnZXIgPSBsb2dnZXJzLnB1c2guYmluZChsb2dnZXJzKVxyXG5cclxuICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgIHJlcSxcclxuICAgICAgcmVzLFxyXG4gICAgICBob3N0LFxyXG4gICAgICBwb3J0LFxyXG4gICAgICBjbGllbnQ6IHJlcS5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MsXHJcbiAgICAgIHVybDogZGVjb2RlVVJJKHJlcS51cmwpXHJcbiAgICB9KVxyXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDRcclxuICAgIHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tY2FjaGUnKVxyXG4gICAgcmVzLnNldEhlYWRlcignQ29ubmVjdGlvbicsICdjbG9zZScpXHJcbiAgICBsb2dnZXJzLmZvckVhY2goKGxvZykgPT4gbG9nKHJlcXVlc3RJbmZvKSlcclxuICAgIHJlcy5lbmQoKVxyXG4gIH0pXHJcblxyXG4gIHNlcnZlci5saXN0ZW4ocG9ydCwgaG9zdCwgKCkgPT4ge1xyXG4gICAgaG9zdCA9IHNlcnZlci5hZGRyZXNzKCkuYWRkcmVzc1xyXG4gICAgcG9ydCA9IHNlcnZlci5hZGRyZXNzKCkucG9ydFxyXG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soeyBob3N0LCBwb3J0LCBydW5uaW5nOiB0cnVlIH0pXHJcbiAgfSlcclxuXHJcbiAgZnVuY3Rpb24gc3RvcCAoY2FsbGJhY2spIHtcclxuICAgIHByb2Nlc3MuZGlzY29ubmVjdCAmJiBwcm9jZXNzLmRpc2Nvbm5lY3QoKVxyXG4gICAgc2VydmVyLmxpc3RlbmluZyAmJiBzZXJ2ZXIuY2xvc2UoY2FsbGJhY2spXHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBhZGRMb2dnZXIsIHN0b3AgfVxyXG59XHJcblxyXG4vLyBFeHBvcnRzXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHN0YXJ0XHJcbn1cclxuXHJcbiJdfQ==