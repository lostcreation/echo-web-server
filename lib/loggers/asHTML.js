'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Renders HTML summary of the request for the client.
 * @param {Object} requestInfo       - Logging info for the the request.
 * @param {string} requestInfo.host  - Servers host or IP address.
 * @param {string} requestInfo.port  - Port the server is listening on.
 * @param {string} requestInfo.url   - The path requested by the client.
 * @param {object} requestInfo.res   - The server response object that will recieve the HTML.
 */
module.exports = asHTML;

function escapeHTML(str) {
  return [[/&/g, '&amp;'], [/>/g, '&gt;'], [/</g, '&lt;'], [/"/g, '&quot;'], [/'/g, '&#39;'], [/\`/g, '&#96;']].reduce(function (p, c) {
    return p.replace.apply(p, _toConsumableArray(c));
  }, str);
}

function asHTML(_ref) {
  var host = _ref.host;
  var port = _ref.port;
  var url = _ref.url;
  var res = _ref.res;

  var HTMLTemplateString = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Echo Web Server</title>\n    <style>\n      #sent, #received {\n        margin-left: 2.5em;\n      }\n    </style>\n    <script>\n      window.addEventListener("load", function (event) {\n        document.getElementById("sent").textContent = decodeURI(document.URL)\n      });\n    </script>\n  </head>\n  <body>\n    <p>You sent the request:</p>\n    <pre id="sent"></pre>\n    <p>I saw the request:</p>\n    <pre id="received">' + escapeHTML('http://' + host + ':' + port + url) + '</pre>\n  </body>\n</html>\n'; // END HTMLTemplateString

  // Send HTML to client
  res.setHeader('Content-Type', 'text/html');
  res.write(HTMLTemplateString);
}
//# sourceMappingURL=asHTML.js.map