'use strict';

module.exports = asHTML;

var escapeHTML = require('../utils/escape-html.js');

function asHTML(_ref) {
  var req = _ref.req;
  var host = _ref.host;
  var port = _ref.port;
  var url = _ref.url;
  var res = _ref.res;

  var hostSawRequest = escapeHTML('http://' + host + ':' + port + url);
  var clientRequested = escapeHTML('http://' + req.headers.host + url);
  var htmlTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>pre { margin-left: 2.5em; }</style>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <pre>' + clientRequested + '</pre>\n    <p>I saw the request:</p>\n    <pre>' + hostSawRequest + '</pre>\n  </body>\n</html>\n'; // END HTMLTemplateString

  res.setHeader('Content-Type', 'text/html');
  res.write(htmlTemplateString);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJzL2FzLWh0bWwuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFzSFRNTCIsImVzY2FwZUhUTUwiLCJyZXF1aXJlIiwicmVxIiwiaG9zdCIsInBvcnQiLCJ1cmwiLCJyZXMiLCJob3N0U2F3UmVxdWVzdCIsImNsaWVudFJlcXVlc3RlZCIsImhlYWRlcnMiLCJodG1sVGVtcGxhdGVTdHJpbmciLCJzZXRIZWFkZXIiLCJ3cml0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE1BQWpCOztBQUVBLElBQU1DLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7O0FBRUEsU0FBU0YsTUFBVCxPQUFnRDtBQUFBLE1BQTdCRyxHQUE2QixRQUE3QkEsR0FBNkI7QUFBQSxNQUF4QkMsSUFBd0IsUUFBeEJBLElBQXdCO0FBQUEsTUFBbEJDLElBQWtCLFFBQWxCQSxJQUFrQjtBQUFBLE1BQVpDLEdBQVksUUFBWkEsR0FBWTtBQUFBLE1BQVBDLEdBQU8sUUFBUEEsR0FBTzs7QUFDOUMsTUFBTUMsaUJBQWlCUCx1QkFBcUJHLElBQXJCLFNBQTZCQyxJQUE3QixHQUFvQ0MsR0FBcEMsQ0FBdkI7QUFDQSxNQUFNRyxrQkFBa0JSLHVCQUFxQkUsSUFBSU8sT0FBSixDQUFZTixJQUFqQyxHQUF3Q0UsR0FBeEMsQ0FBeEI7QUFDQSxNQUFNSyx1UEFTR0YsZUFUSCx3REFXR0QsY0FYSCxpQ0FBTixDQUg4QyxDQWlCOUM7O0FBRUFELE1BQUlLLFNBQUosQ0FBYyxjQUFkLEVBQThCLFdBQTlCO0FBQ0FMLE1BQUlNLEtBQUosQ0FBVUYsa0JBQVY7QUFDRCIsImZpbGUiOiJhcy1odG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYXNIVE1MXG5cbmNvbnN0IGVzY2FwZUhUTUwgPSByZXF1aXJlKCcuLi91dGlscy9lc2NhcGUtaHRtbC5qcycpXG5cbmZ1bmN0aW9uIGFzSFRNTCAoeyByZXEsIGhvc3QsIHBvcnQsIHVybCwgcmVzIH0pIHtcbiAgY29uc3QgaG9zdFNhd1JlcXVlc3QgPSBlc2NhcGVIVE1MKGBodHRwOi8vJHtob3N0fToke3BvcnR9JHt1cmx9YClcbiAgY29uc3QgY2xpZW50UmVxdWVzdGVkID0gZXNjYXBlSFRNTChgaHR0cDovLyR7cmVxLmhlYWRlcnMuaG9zdH0ke3VybH1gKVxuICBjb25zdCBodG1sVGVtcGxhdGVTdHJpbmcgPSBgPCFET0NUWVBFIGh0bWw+XG48aHRtbCBsYW5nPVwiZW5cIj5cbiAgPGhlYWQ+XG4gICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XG4gICAgPHRpdGxlPkVjaG8gV2ViIFNlcnZlcjwvdGl0bGU+XG4gICAgPHN0eWxlPnByZSB7IG1hcmdpbi1sZWZ0OiAyLjVlbTsgfTwvc3R5bGU+XG4gIDwvaGVhZD5cbiAgPGJvZHk+XG4gICAgPHA+WW91IHNlbnQgdGhlIHJlcXVlc3Q6PC9wPlxuICAgIDxwcmU+JHtjbGllbnRSZXF1ZXN0ZWR9PC9wcmU+XG4gICAgPHA+SSBzYXcgdGhlIHJlcXVlc3Q6PC9wPlxuICAgIDxwcmU+JHtob3N0U2F3UmVxdWVzdH08L3ByZT5cbiAgPC9ib2R5PlxuPC9odG1sPlxuYCAvLyBFTkQgSFRNTFRlbXBsYXRlU3RyaW5nXG5cbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpXG4gIHJlcy53cml0ZShodG1sVGVtcGxhdGVTdHJpbmcpXG59XG4iXX0=