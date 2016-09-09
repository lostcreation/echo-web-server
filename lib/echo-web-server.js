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

  var addLogger = loggers.push.bind.loggers;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY2hvLXdlYi1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJzdGFydCIsInBvcnQiLCJob3N0IiwiY2FsbGJhY2siLCJsb2dnZXJzIiwiYWRkTG9nZ2VyIiwicHVzaCIsImJpbmQiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJyZXEiLCJyZXMiLCJyZXF1ZXN0SW5mbyIsIk9iamVjdCIsImZyZWV6ZSIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJyZW1vdGVBZGRyZXNzIiwidXJsIiwiZGVjb2RlVVJJIiwic3RhdHVzQ29kZSIsInNldEhlYWRlciIsImZvckVhY2giLCJsb2ciLCJlbmQiLCJsaXN0ZW4iLCJhZGRyZXNzIiwicnVubmluZyIsInN0b3AiLCJwcm9jZXNzIiwiZGlzY29ubmVjdCIsImxpc3RlbmluZyIsImNsb3NlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUE7QUFDQSxTQUFTQyxLQUFULEdBQTJEO0FBQUEsTUFBM0NDLElBQTJDLHlEQUFwQyxNQUFvQztBQUFBLE1BQTVCQyxJQUE0Qix5REFBckIsU0FBcUI7QUFBQSxNQUFWQyxRQUFVOztBQUN6RDtBQUNBLE1BQUlGLFNBQVMsTUFBYixFQUFxQkEsT0FBTyxDQUFQOztBQUVyQjtBQUNBLE1BQU1HLFVBQVUsRUFBaEI7O0FBRUEsTUFBTUMsWUFBWUQsUUFBUUUsSUFBUixDQUFhQyxJQUFiLENBQWtCSCxPQUFwQzs7QUFFQSxNQUFNSSxTQUFTVixLQUFLVyxZQUFMLENBQWtCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzdDLFFBQU1DLGNBQWNDLE9BQU9DLE1BQVAsQ0FBYztBQUNoQ0gsY0FEZ0M7QUFFaENULGdCQUZnQztBQUdoQ0QsZ0JBSGdDO0FBSWhDYyxjQUFRTCxJQUFJTSxVQUFKLENBQWVDLGFBSlM7QUFLaENDLFdBQUtDLFVBQVVULElBQUlRLEdBQWQ7QUFMMkIsS0FBZCxDQUFwQjtBQU9BUCxRQUFJUyxVQUFKLEdBQWlCLEdBQWpCO0FBQ0FULFFBQUlVLFNBQUosQ0FBYyxlQUFkLEVBQStCLFVBQS9CO0FBQ0FWLFFBQUlVLFNBQUosQ0FBYyxZQUFkLEVBQTRCLE9BQTVCO0FBQ0FqQixZQUFRa0IsT0FBUixDQUFnQixVQUFDQyxHQUFEO0FBQUEsYUFBU0EsSUFBSVgsV0FBSixDQUFUO0FBQUEsS0FBaEI7QUFDQUQsUUFBSWEsR0FBSjtBQUNELEdBYmMsQ0FBZjs7QUFlQWhCLFNBQU9pQixNQUFQLENBQWN4QixJQUFkLEVBQW9CQyxJQUFwQixFQUEwQixZQUFNO0FBQzlCQSxXQUFPTSxPQUFPa0IsT0FBUCxHQUFpQkEsT0FBeEI7QUFDQXpCLFdBQU9PLE9BQU9rQixPQUFQLEdBQWlCekIsSUFBeEI7QUFDQUUsZ0JBQVlBLFNBQVMsRUFBRUQsVUFBRixFQUFRRCxVQUFSLEVBQWMwQixTQUFTLElBQXZCLEVBQVQsQ0FBWjtBQUNELEdBSkQ7O0FBTUEsV0FBU0MsSUFBVCxDQUFlekIsUUFBZixFQUF5QjtBQUN2QjBCLFlBQVFDLFVBQVIsSUFBc0JELFFBQVFDLFVBQVIsRUFBdEI7QUFDQXRCLFdBQU91QixTQUFQLElBQW9CdkIsT0FBT3dCLEtBQVAsQ0FBYTdCLFFBQWIsQ0FBcEI7QUFDRDs7QUFFRCxTQUFPLEVBQUVFLG9CQUFGLEVBQWF1QixVQUFiLEVBQVA7QUFDRDs7QUFFRDtBQUNBSyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZsQztBQURlLENBQWpCIiwiZmlsZSI6ImVjaG8td2ViLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG4vLyBEZXBlbmRlbmNpZXNcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJylcblxuLy8gU2VydmVyIENvbmZpZ1xuZnVuY3Rpb24gc3RhcnQgKHBvcnQgPSAnODA4MCcsIGhvc3QgPSAnMC4wLjAuMCcsIGNhbGxiYWNrKSB7XG4gIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2UgZm9yIGFuIGF1dG8tcG9ydC5cbiAgaWYgKHBvcnQgPT09ICdhdXRvJykgcG9ydCA9IDBcblxuICAvLyBVbmxlc3MgaXQgaGFzIGxvZ2dlcnMsIG91ciBzZXJ2ZXIgd29uJ3QgZG8gYW55dGhpbmcuXG4gIGNvbnN0IGxvZ2dlcnMgPSBbXVxuXG4gIGNvbnN0IGFkZExvZ2dlciA9IGxvZ2dlcnMucHVzaC5iaW5kLmxvZ2dlcnNcblxuICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgcmVzLFxuICAgICAgaG9zdCxcbiAgICAgIHBvcnQsXG4gICAgICBjbGllbnQ6IHJlcS5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MsXG4gICAgICB1cmw6IGRlY29kZVVSSShyZXEudXJsKVxuICAgIH0pXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDRcbiAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ25vLWNhY2hlJylcbiAgICByZXMuc2V0SGVhZGVyKCdDb25uZWN0aW9uJywgJ2Nsb3NlJylcbiAgICBsb2dnZXJzLmZvckVhY2goKGxvZykgPT4gbG9nKHJlcXVlc3RJbmZvKSlcbiAgICByZXMuZW5kKClcbiAgfSlcblxuICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3QsICgpID0+IHtcbiAgICBob3N0ID0gc2VydmVyLmFkZHJlc3MoKS5hZGRyZXNzXG4gICAgcG9ydCA9IHNlcnZlci5hZGRyZXNzKCkucG9ydFxuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHsgaG9zdCwgcG9ydCwgcnVubmluZzogdHJ1ZSB9KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGNhbGxiYWNrKSB7XG4gICAgcHJvY2Vzcy5kaXNjb25uZWN0ICYmIHByb2Nlc3MuZGlzY29ubmVjdCgpXG4gICAgc2VydmVyLmxpc3RlbmluZyAmJiBzZXJ2ZXIuY2xvc2UoY2FsbGJhY2spXG4gIH1cblxuICByZXR1cm4geyBhZGRMb2dnZXIsIHN0b3AgfVxufVxuXG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RhcnRcbn1cblxuIl19