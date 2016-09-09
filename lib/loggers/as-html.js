'use strict';

module.exports = asHTML;

var escapeHTML = require('../utils/escape-html.js');

/**
 * Renders HTML summary of the request for the client.
 * @param {Object} requestInfo       - Logging info for the the request.
 * @param {string} requestInfo.host  - Servers host or IP address.
 * @param {string} requestInfo.port  - Port the server is listening on.
 * @param {string} requestInfo.url   - The path requested by the client.
 * @param {object} requestInfo.res   - The server response object that will recieve the HTML.
 */
function asHTML(_ref) {
  var host = _ref.host;
  var port = _ref.port;
  var url = _ref.url;
  var res = _ref.res;

  var htmlTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>\n      #sent, #received {\n        margin-left: 2.5em;\n      }\n    </style>\n    <script>\n      window.addEventListener("load", function (event) {\n        document.getElementById("sent").textContent = decodeURI(document.URL)\n      });\n    </script>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <pre id="sent"></pre>\n    <p>I saw the request:</p>\n    <pre id="received">' + escapeHTML('http://' + host + ':' + port + url) + '</pre>\n  </body>\n</html>\n'; // END HTMLTemplateString

  // Send HTML to client
  res.setHeader('Content-Type', 'text/html');
  res.write(htmlTemplateString);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJzL2FzLWh0bWwuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFzSFRNTCIsImVzY2FwZUhUTUwiLCJyZXF1aXJlIiwiaG9zdCIsInBvcnQiLCJ1cmwiLCJyZXMiLCJodG1sVGVtcGxhdGVTdHJpbmciLCJzZXRIZWFkZXIiLCJ3cml0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE1BQWpCOztBQUVBLElBQU1DLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7O0FBRUE7Ozs7Ozs7O0FBUUEsU0FBU0YsTUFBVCxPQUEyQztBQUFBLE1BQXhCRyxJQUF3QixRQUF4QkEsSUFBd0I7QUFBQSxNQUFsQkMsSUFBa0IsUUFBbEJBLElBQWtCO0FBQUEsTUFBWkMsR0FBWSxRQUFaQSxHQUFZO0FBQUEsTUFBUEMsR0FBTyxRQUFQQSxHQUFPOztBQUN6QyxNQUFNQywyaEJBb0JpQk4sdUJBQXFCRSxJQUFyQixTQUE2QkMsSUFBN0IsR0FBb0NDLEdBQXBDLENBcEJqQixpQ0FBTixDQUR5QyxDQXdCekM7O0FBRUE7QUFDQUMsTUFBSUUsU0FBSixDQUFjLGNBQWQsRUFBOEIsV0FBOUI7QUFDQUYsTUFBSUcsS0FBSixDQUFVRixrQkFBVjtBQUNEIiwiZmlsZSI6ImFzLWh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhc0hUTUxcblxuY29uc3QgZXNjYXBlSFRNTCA9IHJlcXVpcmUoJy4uL3V0aWxzL2VzY2FwZS1odG1sLmpzJylcblxuLyoqXG4gKiBSZW5kZXJzIEhUTUwgc3VtbWFyeSBvZiB0aGUgcmVxdWVzdCBmb3IgdGhlIGNsaWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0SW5mbyAgICAgICAtIExvZ2dpbmcgaW5mbyBmb3IgdGhlIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RJbmZvLmhvc3QgIC0gU2VydmVycyBob3N0IG9yIElQIGFkZHJlc3MuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdEluZm8ucG9ydCAgLSBQb3J0IHRoZSBzZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RJbmZvLnVybCAgIC0gVGhlIHBhdGggcmVxdWVzdGVkIGJ5IHRoZSBjbGllbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdEluZm8ucmVzICAgLSBUaGUgc2VydmVyIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgcmVjaWV2ZSB0aGUgSFRNTC5cbiAqL1xuZnVuY3Rpb24gYXNIVE1MICh7IGhvc3QsIHBvcnQsIHVybCwgcmVzIH0pIHtcbiAgY29uc3QgaHRtbFRlbXBsYXRlU3RyaW5nID0gYDwhRE9DVFlQRSBodG1sPlxuPGh0bWwgbGFuZz1cImVuXCI+XG4gIDxoZWFkPlxuICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuICAgIDx0aXRsZT5FY2hvIFdlYiBTZXJ2ZXI8L3RpdGxlPlxuICAgIDxzdHlsZT5cbiAgICAgICNzZW50LCAjcmVjZWl2ZWQge1xuICAgICAgICBtYXJnaW4tbGVmdDogMi41ZW07XG4gICAgICB9XG4gICAgPC9zdHlsZT5cbiAgICA8c2NyaXB0PlxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbnRcIikudGV4dENvbnRlbnQgPSBkZWNvZGVVUkkoZG9jdW1lbnQuVVJMKVxuICAgICAgfSk7XG4gICAgPC9zY3JpcHQ+XG4gIDwvaGVhZD5cbiAgPGJvZHk+XG4gICAgPHA+WW91IHNlbnQgdGhlIHJlcXVlc3Q6PC9wPlxuICAgIDxwcmUgaWQ9XCJzZW50XCI+PC9wcmU+XG4gICAgPHA+SSBzYXcgdGhlIHJlcXVlc3Q6PC9wPlxuICAgIDxwcmUgaWQ9XCJyZWNlaXZlZFwiPiR7ZXNjYXBlSFRNTChgaHR0cDovLyR7aG9zdH06JHtwb3J0fSR7dXJsfWApfTwvcHJlPlxuICA8L2JvZHk+XG48L2h0bWw+XG5gIC8vIEVORCBIVE1MVGVtcGxhdGVTdHJpbmdcblxuICAvLyBTZW5kIEhUTUwgdG8gY2xpZW50XG4gIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2h0bWwnKVxuICByZXMud3JpdGUoaHRtbFRlbXBsYXRlU3RyaW5nKVxufVxuIl19