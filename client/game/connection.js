import Peer from 'peerjs'
import peerConfig from './config/peer'

function configConnection (conn) {
  conn.on('open', function () {
    console.log('Connected to: ' + conn.peer)
  })
  conn.on('data', function (data) {
    console.log('DATA', data)
  })
  conn.on('close', function () {
    console.log('CLOSE', 'Connection closed')
  })

  return conn
}

const peer = new Peer(null, peerConfig)
let conn

peer.on('open', function () {
  console.log('ID: ' + peer.id)

  fetch('/find-opponent', {
    method: 'POST',
    body: JSON.stringify({ id: peer.id }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(res => {
    res
      .json()
      .then(({ id }) => {
        conn = peer.connect(id)
        configConnection(conn)
      })
      .catch(e => {
        console.log('Esperando conexão...')
      })
  })
})

peer.on('close', function () {
  conn = null
  console.log('Connection destroyed')
})

peer.on('connection', function (c) {
  if (conn && conn.open) {
    c.on('open', function () {
      c.send('Already connected to another client')
      setTimeout(function () {
        c.close()
      }, 500)
    })
    return
  }

  conn = c
  configConnection(conn)
  console.log('Connected to: ' + conn.peer)
})

peer.on('disconnected', function () {
  console.log('Connection lost. Please reconnect')
})

peer.on('error', function (err) {
  console.log(err)
})
