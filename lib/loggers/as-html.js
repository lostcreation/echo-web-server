'use strict';

var escapeHTML = require('../utils/escape-html.js');

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    host: '0.0.0.0',
    port: 0,
    url: '/',
    res: undefined
  },
      host = _ref.host,
      port = _ref.port,
      url = _ref.url,
      res = _ref.res;

  var htmlTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>\n      #sent, #received {\n        margin-left: 2.5em;\n      }\n    </style>\n    <script>\n      window.addEventListener("load", function (event) {\n        document.getElementById("sent").textContent = decodeURI(document.URL)\n      });\n    </script>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <pre id="sent"></pre>\n    <p>I saw the request:</p>\n    <pre id="received">' + escapeHTML('http://' + host + ':' + port + url) + '</pre>\n  </body>\n</html>\n'; // END htmlTemplateString

  res.setHeader('Content-Type', 'text/html');
  res.write(htmlTemplateString);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJzL2FzLWh0bWwuanMiXSwibmFtZXMiOlsiZXNjYXBlSFRNTCIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaG9zdCIsInBvcnQiLCJ1cmwiLCJyZXMiLCJ1bmRlZmluZWQiLCJodG1sVGVtcGxhdGVTdHJpbmciLCJzZXRIZWFkZXIiLCJ3cml0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBTUEsYUFBYUMsUUFBUSx5QkFBUixDQUFuQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQixZQUtYO0FBQUEsaUZBTHVDO0FBQzNDQyxVQUFNLFNBRHFDO0FBRTNDQyxVQUFNLENBRnFDO0FBRzNDQyxTQUFLLEdBSHNDO0FBSTNDQyxTQUFLQztBQUpzQyxHQUt2QztBQUFBLE1BTGNKLElBS2QsUUFMY0EsSUFLZDtBQUFBLE1BTG9CQyxJQUtwQixRQUxvQkEsSUFLcEI7QUFBQSxNQUwwQkMsR0FLMUIsUUFMMEJBLEdBSzFCO0FBQUEsTUFMK0JDLEdBSy9CLFFBTCtCQSxHQUsvQjs7QUFDSixNQUFNRSwyaEJBb0JpQlQsdUJBQXFCSSxJQUFyQixTQUE2QkMsSUFBN0IsR0FBb0NDLEdBQXBDLENBcEJqQixpQ0FBTixDQURJLENBd0JKOztBQUVBQyxNQUFJRyxTQUFKLENBQWMsY0FBZCxFQUE4QixXQUE5QjtBQUNBSCxNQUFJSSxLQUFKLENBQVVGLGtCQUFWO0FBQ0QsQ0FqQ0QiLCJmaWxlIjoiYXMtaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBlc2NhcGVIVE1MID0gcmVxdWlyZSgnLi4vdXRpbHMvZXNjYXBlLWh0bWwuanMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9ICh7IGhvc3QsIHBvcnQsIHVybCwgcmVzIH0gPSB7XG4gIGhvc3Q6ICcwLjAuMC4wJyxcbiAgcG9ydDogMCxcbiAgdXJsOiAnLycsXG4gIHJlczogdW5kZWZpbmVkXG59KSA9PiB7XG4gIGNvbnN0IGh0bWxUZW1wbGF0ZVN0cmluZyA9IGA8IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuICA8aGVhZD5cbiAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cbiAgICA8dGl0bGU+RWNobyBXZWIgU2VydmVyPC90aXRsZT5cbiAgICA8c3R5bGU+XG4gICAgICAjc2VudCwgI3JlY2VpdmVkIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIuNWVtO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPHNjcmlwdD5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW50XCIpLnRleHRDb250ZW50ID0gZGVjb2RlVVJJKGRvY3VtZW50LlVSTClcbiAgICAgIH0pO1xuICAgIDwvc2NyaXB0PlxuICA8L2hlYWQ+XG4gIDxib2R5PlxuICAgIDxwPllvdSBzZW50IHRoZSByZXF1ZXN0OjwvcD5cbiAgICA8cHJlIGlkPVwic2VudFwiPjwvcHJlPlxuICAgIDxwPkkgc2F3IHRoZSByZXF1ZXN0OjwvcD5cbiAgICA8cHJlIGlkPVwicmVjZWl2ZWRcIj4ke2VzY2FwZUhUTUwoYGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0ke3VybH1gKX08L3ByZT5cbiAgPC9ib2R5PlxuPC9odG1sPlxuYCAvLyBFTkQgaHRtbFRlbXBsYXRlU3RyaW5nXG5cbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpXG4gIHJlcy53cml0ZShodG1sVGVtcGxhdGVTdHJpbmcpXG59XG4iXX0=