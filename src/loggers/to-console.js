'use strict'

module.exports = function ({req, host, port, client, url}) {
  console.log(`[EWS] ${host}:${port}: Client ${client} requested http://${req.headers.host}${url}`)
}
