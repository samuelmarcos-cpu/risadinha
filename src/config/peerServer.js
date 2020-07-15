const { ExpressPeerServer } = require('peer')
const { Comedian } = require('../model/Comedians')

module.exports = function (server) {
  const peerServer = ExpressPeerServer(server, {
    path: '/myapp'
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
