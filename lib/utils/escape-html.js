'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var map = // [[regexp of character(s) to match, entity to replace with]]
[[/&/g, '&amp;'], [/>/g, '&gt;'], [/</g, '&lt;'], [/"/g, '&quot;'], [/'/g, '&apos;'], [/`/g, '&grave;']];

/**
 * Properly escapes HTML tags and special characters to prevent mischief.
 * @param {string} str - A string that we don't want to contain any HTML or special characters.
 * @return {string} - The original string, properly escaped.
 */
module.exports = function (str) {
  return map.reduce(function (p, c) {
    return p.replace.apply(p, _toConsumableArray(c));
  }, str);
};
//# sourceMappingURL=escape-html.js.map