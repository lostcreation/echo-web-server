'use strict'

/**
 * Logs request information to the console.
 * @param {Object} requestInfo        - Logging info for the the request.
 * @param {string} requestInfo.client - The IP address for the client.
 * @param {string} requestInfo.url    - The path requested by the client.
 */
module.exports = function ({host, port, client, url}) {
  console.log(`[${host}:${port}] Client [${client}] Requested: ${url}`)
}
