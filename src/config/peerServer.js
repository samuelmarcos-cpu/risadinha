const { ExpressPeerServer } = require('peer')
const { Comedian } = require('../model/Comedians')
const os = require('os')

module.exports = function (server) {
  const peerServer = ExpressPeerServer(server, {
    host: os.hostname(),
    port: process.env.PORT || 3186,
    path: '/myapp',
    ssl: true
  })

  peerServer.on('connection', client => {
    new Comedian(client.getId()).push()
    console.log('connection', client.getId())
  })

  peerServer.on('disconnect', client => {
    new Comedian(client.getId()).remove()
    console.log('disconnect', client.getId())
  })

  return peerServer
}
