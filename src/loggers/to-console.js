'use strict'

module.exports = function ({req, host, port, client, url}) {
  const clientRequest = 'http://' + (req.headers.host + url).replace(/"/g, '&quot;"')
  console.log(`[EWS] ${host}:${port}: Client ${client} requested ${clientRequest}`)
}
