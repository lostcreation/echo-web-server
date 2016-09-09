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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9lc2NhcGUtaHRtbC5qcyJdLCJuYW1lcyI6WyJtYXAiLCJtb2R1bGUiLCJleHBvcnRzIiwic3RyIiwicmVkdWNlIiwicCIsImMiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUVBLElBQU1BLE1BQU07QUFDWixDQUFFLENBQUMsSUFBRCxFQUFPLE9BQVAsQ0FBRixFQUNFLENBQUMsSUFBRCxFQUFPLE1BQVAsQ0FERixFQUVFLENBQUMsSUFBRCxFQUFPLE1BQVAsQ0FGRixFQUdFLENBQUMsSUFBRCxFQUFPLFFBQVAsQ0FIRixFQUlFLENBQUMsSUFBRCxFQUFPLFFBQVAsQ0FKRixFQUtFLENBQUMsSUFBRCxFQUFPLFNBQVAsQ0FMRixDQURBOztBQVNBOzs7OztBQUtBQyxPQUFPQyxPQUFQLEdBQWlCLFVBQUNDLEdBQUQsRUFBUztBQUN4QixTQUFPSCxJQUFJSSxNQUFKLENBQVcsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUQsRUFBRUUsT0FBRiw2QkFBYUQsQ0FBYixFQUFWO0FBQUEsR0FBWCxFQUFzQ0gsR0FBdEMsQ0FBUDtBQUNELENBRkQiLCJmaWxlIjoiZXNjYXBlLWh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmNvbnN0IG1hcCA9IC8vIFtbcmVnZXhwIG9mIGNoYXJhY3RlcihzKSB0byBtYXRjaCwgZW50aXR5IHRvIHJlcGxhY2Ugd2l0aF1dXHJcblsgWy8mL2csICcmYW1wOyddLFxyXG4gIFsvPi9nLCAnJmd0OyddLFxyXG4gIFsvPC9nLCAnJmx0OyddLFxyXG4gIFsvXCIvZywgJyZxdW90OyddLFxyXG4gIFsvJy9nLCAnJmFwb3M7J10sXHJcbiAgWy9gL2csICcmZ3JhdmU7J11cclxuXVxyXG5cclxuLyoqXHJcbiAqIFByb3Blcmx5IGVzY2FwZXMgSFRNTCB0YWdzIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnMgdG8gcHJldmVudCBtaXNjaGllZi5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIEEgc3RyaW5nIHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBjb250YWluIGFueSBIVE1MIG9yIHNwZWNpYWwgY2hhcmFjdGVycy5cclxuICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSBvcmlnaW5hbCBzdHJpbmcsIHByb3Blcmx5IGVzY2FwZWQuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChzdHIpID0+IHtcclxuICByZXR1cm4gbWFwLnJlZHVjZSgocCwgYykgPT4gcC5yZXBsYWNlKC4uLmMpLCBzdHIpXHJcbn1cclxuIl19