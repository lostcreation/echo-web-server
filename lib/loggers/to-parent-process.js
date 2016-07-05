"use strict";

module.exports = function (_ref) {
  var client = _ref.client;
  var url = _ref.url;

  process.send && process.send({ client: client, url: url });
};
//# sourceMappingURL=to-parent-process.js.map