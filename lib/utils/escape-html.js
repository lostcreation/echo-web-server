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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9lc2NhcGUtaHRtbC5qcyJdLCJuYW1lcyI6WyJtYXAiLCJtb2R1bGUiLCJleHBvcnRzIiwic3RyIiwicmVkdWNlIiwicCIsImMiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUVBLElBQU1BLE1BQU07QUFDWixDQUFFLENBQUMsSUFBRCxFQUFPLE9BQVAsQ0FBRixFQUNFLENBQUMsSUFBRCxFQUFPLE1BQVAsQ0FERixFQUVFLENBQUMsSUFBRCxFQUFPLE1BQVAsQ0FGRixFQUdFLENBQUMsSUFBRCxFQUFPLFFBQVAsQ0FIRixFQUlFLENBQUMsSUFBRCxFQUFPLFFBQVAsQ0FKRixFQUtFLENBQUMsSUFBRCxFQUFPLFNBQVAsQ0FMRixDQURBOztBQVNBOzs7OztBQUtBQyxPQUFPQyxPQUFQLEdBQWlCLFVBQUNDLEdBQUQsRUFBUztBQUN4QixTQUFPSCxJQUFJSSxNQUFKLENBQVcsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUQsRUFBRUUsT0FBRiw2QkFBYUQsQ0FBYixFQUFWO0FBQUEsR0FBWCxFQUFzQ0gsR0FBdEMsQ0FBUDtBQUNELENBRkQiLCJmaWxlIjoiZXNjYXBlLWh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuY29uc3QgbWFwID0gLy8gW1tyZWdleHAgb2YgY2hhcmFjdGVyKHMpIHRvIG1hdGNoLCBlbnRpdHkgdG8gcmVwbGFjZSB3aXRoXV1cblsgWy8mL2csICcmYW1wOyddLFxuICBbLz4vZywgJyZndDsnXSxcbiAgWy88L2csICcmbHQ7J10sXG4gIFsvXCIvZywgJyZxdW90OyddLFxuICBbLycvZywgJyZhcG9zOyddLFxuICBbL2AvZywgJyZncmF2ZTsnXVxuXVxuXG4vKipcbiAqIFByb3Blcmx5IGVzY2FwZXMgSFRNTCB0YWdzIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnMgdG8gcHJldmVudCBtaXNjaGllZi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBBIHN0cmluZyB0aGF0IHdlIGRvbid0IHdhbnQgdG8gY29udGFpbiBhbnkgSFRNTCBvciBzcGVjaWFsIGNoYXJhY3RlcnMuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIG9yaWdpbmFsIHN0cmluZywgcHJvcGVybHkgZXNjYXBlZC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoc3RyKSA9PiB7XG4gIHJldHVybiBtYXAucmVkdWNlKChwLCBjKSA9PiBwLnJlcGxhY2UoLi4uYyksIHN0cilcbn1cbiJdfQ==