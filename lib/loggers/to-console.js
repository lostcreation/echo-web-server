'use strict';

/**
 * Logs request information to the console.
 * @param {Object} requestInfo        - Logging info for the the request.
 * @param {string} requestInfo.client - The IP address for the client.
 * @param {string} requestInfo.url    - The path requested by the client.
 */

module.exports = function (_ref) {
  var host = _ref.host;
  var port = _ref.port;
  var client = _ref.client;
  var url = _ref.url;

  console.log('[' + host + ':' + port + '] Client [' + client + '] Requested: ' + url);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJzL3RvLWNvbnNvbGUuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImhvc3QiLCJwb3J0IiwiY2xpZW50IiwidXJsIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7QUFNQUEsT0FBT0MsT0FBUCxHQUFpQixnQkFBcUM7QUFBQSxNQUExQkMsSUFBMEIsUUFBMUJBLElBQTBCO0FBQUEsTUFBcEJDLElBQW9CLFFBQXBCQSxJQUFvQjtBQUFBLE1BQWRDLE1BQWMsUUFBZEEsTUFBYztBQUFBLE1BQU5DLEdBQU0sUUFBTkEsR0FBTTs7QUFDcERDLFVBQVFDLEdBQVIsT0FBZ0JMLElBQWhCLFNBQXdCQyxJQUF4QixrQkFBeUNDLE1BQXpDLHFCQUErREMsR0FBL0Q7QUFDRCxDQUZEIiwiZmlsZSI6InRvLWNvbnNvbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBMb2dzIHJlcXVlc3QgaW5mb3JtYXRpb24gdG8gdGhlIGNvbnNvbGUuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0SW5mbyAgICAgICAgLSBMb2dnaW5nIGluZm8gZm9yIHRoZSB0aGUgcmVxdWVzdC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RJbmZvLmNsaWVudCAtIFRoZSBJUCBhZGRyZXNzIGZvciB0aGUgY2xpZW50LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdEluZm8udXJsICAgIC0gVGhlIHBhdGggcmVxdWVzdGVkIGJ5IHRoZSBjbGllbnQuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7aG9zdCwgcG9ydCwgY2xpZW50LCB1cmx9KSB7XHJcbiAgY29uc29sZS5sb2coYFske2hvc3R9OiR7cG9ydH1dIENsaWVudCBbJHtjbGllbnR9XSBSZXF1ZXN0ZWQ6ICR7dXJsfWApXHJcbn1cclxuIl19