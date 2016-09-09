'use strict';

module.exports = asHTML;

var escapeHTML = require('../utils/escape-html.js');

function asHTML(_ref) {
  var host = _ref.host;
  var port = _ref.port;
  var url = _ref.url;
  var res = _ref.res;

  var htmlTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>\n      #sent, #received {\n        margin-left: 2.5em;\n      }\n    </style>\n    <script>\n      window.addEventListener("load", function (event) {\n        document.getElementById("sent").textContent = decodeURI(document.URL)\n      });\n    </script>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <pre id="sent"></pre>\n    <p>I saw the request:</p>\n    <pre id="received">' + escapeHTML('http://' + host + ':' + port + url) + '</pre>\n  </body>\n</html>\n'; // END HTMLTemplateString

  res.setHeader('Content-Type', 'text/html');
  res.write(htmlTemplateString);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJzL2FzLWh0bWwuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFzSFRNTCIsImVzY2FwZUhUTUwiLCJyZXF1aXJlIiwiaG9zdCIsInBvcnQiLCJ1cmwiLCJyZXMiLCJodG1sVGVtcGxhdGVTdHJpbmciLCJzZXRIZWFkZXIiLCJ3cml0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE1BQWpCOztBQUVBLElBQU1DLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7O0FBRUEsU0FBU0YsTUFBVCxPQUEyQztBQUFBLE1BQXhCRyxJQUF3QixRQUF4QkEsSUFBd0I7QUFBQSxNQUFsQkMsSUFBa0IsUUFBbEJBLElBQWtCO0FBQUEsTUFBWkMsR0FBWSxRQUFaQSxHQUFZO0FBQUEsTUFBUEMsR0FBTyxRQUFQQSxHQUFPOztBQUN6QyxNQUFNQywyaEJBb0JpQk4sdUJBQXFCRSxJQUFyQixTQUE2QkMsSUFBN0IsR0FBb0NDLEdBQXBDLENBcEJqQixpQ0FBTixDQUR5QyxDQXdCekM7O0FBRUFDLE1BQUlFLFNBQUosQ0FBYyxjQUFkLEVBQThCLFdBQTlCO0FBQ0FGLE1BQUlHLEtBQUosQ0FBVUYsa0JBQVY7QUFDRCIsImZpbGUiOiJhcy1odG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYXNIVE1MXG5cbmNvbnN0IGVzY2FwZUhUTUwgPSByZXF1aXJlKCcuLi91dGlscy9lc2NhcGUtaHRtbC5qcycpXG5cbmZ1bmN0aW9uIGFzSFRNTCAoeyBob3N0LCBwb3J0LCB1cmwsIHJlcyB9KSB7XG4gIGNvbnN0IGh0bWxUZW1wbGF0ZVN0cmluZyA9IGA8IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuICA8aGVhZD5cbiAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cbiAgICA8dGl0bGU+RWNobyBXZWIgU2VydmVyPC90aXRsZT5cbiAgICA8c3R5bGU+XG4gICAgICAjc2VudCwgI3JlY2VpdmVkIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIuNWVtO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPHNjcmlwdD5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW50XCIpLnRleHRDb250ZW50ID0gZGVjb2RlVVJJKGRvY3VtZW50LlVSTClcbiAgICAgIH0pO1xuICAgIDwvc2NyaXB0PlxuICA8L2hlYWQ+XG4gIDxib2R5PlxuICAgIDxwPllvdSBzZW50IHRoZSByZXF1ZXN0OjwvcD5cbiAgICA8cHJlIGlkPVwic2VudFwiPjwvcHJlPlxuICAgIDxwPkkgc2F3IHRoZSByZXF1ZXN0OjwvcD5cbiAgICA8cHJlIGlkPVwicmVjZWl2ZWRcIj4ke2VzY2FwZUhUTUwoYGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0ke3VybH1gKX08L3ByZT5cbiAgPC9ib2R5PlxuPC9odG1sPlxuYCAvLyBFTkQgSFRNTFRlbXBsYXRlU3RyaW5nXG5cbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpXG4gIHJlcy53cml0ZShodG1sVGVtcGxhdGVTdHJpbmcpXG59XG4iXX0=