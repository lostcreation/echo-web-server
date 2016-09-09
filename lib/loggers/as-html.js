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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJzL2FzLWh0bWwuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFzSFRNTCIsImVzY2FwZUhUTUwiLCJyZXF1aXJlIiwiaG9zdCIsInBvcnQiLCJ1cmwiLCJyZXMiLCJodG1sVGVtcGxhdGVTdHJpbmciLCJzZXRIZWFkZXIiLCJ3cml0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE1BQWpCOztBQUVBLElBQU1DLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7O0FBRUEsU0FBU0YsTUFBVCxPQUEyQztBQUFBLE1BQXhCRyxJQUF3QixRQUF4QkEsSUFBd0I7QUFBQSxNQUFsQkMsSUFBa0IsUUFBbEJBLElBQWtCO0FBQUEsTUFBWkMsR0FBWSxRQUFaQSxHQUFZO0FBQUEsTUFBUEMsR0FBTyxRQUFQQSxHQUFPOztBQUN6QyxNQUFNQywyaEJBb0JpQk4sdUJBQXFCRSxJQUFyQixTQUE2QkMsSUFBN0IsR0FBb0NDLEdBQXBDLENBcEJqQixpQ0FBTixDQUR5QyxDQXdCekM7O0FBRUFDLE1BQUlFLFNBQUosQ0FBYyxjQUFkLEVBQThCLFdBQTlCO0FBQ0FGLE1BQUlHLEtBQUosQ0FBVUYsa0JBQVY7QUFDRCIsImZpbGUiOiJhcy1odG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFzSFRNTFxyXG5cclxuY29uc3QgZXNjYXBlSFRNTCA9IHJlcXVpcmUoJy4uL3V0aWxzL2VzY2FwZS1odG1sLmpzJylcclxuXHJcbmZ1bmN0aW9uIGFzSFRNTCAoeyBob3N0LCBwb3J0LCB1cmwsIHJlcyB9KSB7XHJcbiAgY29uc3QgaHRtbFRlbXBsYXRlU3RyaW5nID0gYDwhRE9DVFlQRSBodG1sPlxyXG48aHRtbCBsYW5nPVwiZW5cIj5cclxuICA8aGVhZD5cclxuICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxyXG4gICAgPHRpdGxlPkVjaG8gV2ViIFNlcnZlcjwvdGl0bGU+XHJcbiAgICA8c3R5bGU+XHJcbiAgICAgICNzZW50LCAjcmVjZWl2ZWQge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyLjVlbTtcclxuICAgICAgfVxyXG4gICAgPC9zdHlsZT5cclxuICAgIDxzY3JpcHQ+XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbnRcIikudGV4dENvbnRlbnQgPSBkZWNvZGVVUkkoZG9jdW1lbnQuVVJMKVxyXG4gICAgICB9KTtcclxuICAgIDwvc2NyaXB0PlxyXG4gIDwvaGVhZD5cclxuICA8Ym9keT5cclxuICAgIDxwPllvdSBzZW50IHRoZSByZXF1ZXN0OjwvcD5cclxuICAgIDxwcmUgaWQ9XCJzZW50XCI+PC9wcmU+XHJcbiAgICA8cD5JIHNhdyB0aGUgcmVxdWVzdDo8L3A+XHJcbiAgICA8cHJlIGlkPVwicmVjZWl2ZWRcIj4ke2VzY2FwZUhUTUwoYGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0ke3VybH1gKX08L3ByZT5cclxuICA8L2JvZHk+XHJcbjwvaHRtbD5cclxuYCAvLyBFTkQgSFRNTFRlbXBsYXRlU3RyaW5nXHJcblxyXG4gIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2h0bWwnKVxyXG4gIHJlcy53cml0ZShodG1sVGVtcGxhdGVTdHJpbmcpXHJcbn1cclxuIl19