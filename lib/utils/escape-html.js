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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9lc2NhcGUtaHRtbC5qcyJdLCJuYW1lcyI6WyJtYXAiLCJtb2R1bGUiLCJleHBvcnRzIiwic3RyIiwicmVkdWNlIiwicCIsImMiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUVBLElBQU1BLE1BQU07QUFDVixDQUFFLENBQUMsSUFBRCxFQUFPLE9BQVAsQ0FBRixFQUNFLENBQUMsSUFBRCxFQUFPLE1BQVAsQ0FERixFQUVFLENBQUMsSUFBRCxFQUFPLE1BQVAsQ0FGRixFQUdFLENBQUMsSUFBRCxFQUFPLFFBQVAsQ0FIRixFQUlFLENBQUMsSUFBRCxFQUFPLFFBQVAsQ0FKRixFQUtFLENBQUMsSUFBRCxFQUFPLFNBQVAsQ0FMRixDQURGOztBQVNBOzs7OztBQUtBQyxPQUFPQyxPQUFQLEdBQWlCLFVBQUNDLEdBQUQsRUFBUztBQUN4QixTQUFPSCxJQUFJSSxNQUFKLENBQVcsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUQsRUFBRUUsT0FBRiw2QkFBYUQsQ0FBYixFQUFWO0FBQUEsR0FBWCxFQUFzQ0gsR0FBdEMsQ0FBUDtBQUNELENBRkQiLCJmaWxlIjoiZXNjYXBlLWh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuY29uc3QgbWFwID0gLy8gW1tyZWdleHAgb2YgY2hhcmFjdGVyKHMpIHRvIG1hdGNoLCBlbnRpdHkgdG8gcmVwbGFjZSB3aXRoXV1cbiAgWyBbLyYvZywgJyZhbXA7J10sXG4gICAgWy8+L2csICcmZ3Q7J10sXG4gICAgWy88L2csICcmbHQ7J10sXG4gICAgWy9cIi9nLCAnJnF1b3Q7J10sXG4gICAgWy8nL2csICcmYXBvczsnXSxcbiAgICBbL2AvZywgJyZncmF2ZTsnXVxuICBdXG5cbi8qKlxuICogUHJvcGVybHkgZXNjYXBlcyBIVE1MIHRhZ3MgYW5kIHNwZWNpYWwgY2hhcmFjdGVycyB0byBwcmV2ZW50IG1pc2NoaWVmLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIEEgc3RyaW5nIHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBjb250YWluIGFueSBIVE1MIG9yIHNwZWNpYWwgY2hhcmFjdGVycy5cbiAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgb3JpZ2luYWwgc3RyaW5nLCBwcm9wZXJseSBlc2NhcGVkLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChzdHIpID0+IHtcbiAgcmV0dXJuIG1hcC5yZWR1Y2UoKHAsIGMpID0+IHAucmVwbGFjZSguLi5jKSwgc3RyKVxufVxuIl19