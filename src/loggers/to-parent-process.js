module.exports = ({ client, url }) => {
  process.send && process.send({ client, url })
}
