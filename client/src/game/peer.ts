import Peer from 'peerjs'

type ConnectionCallback = (conn: Peer.DataConnection) => void
type Callback = () => void

class MyPeer extends Peer {
  private listenersConnection: ConnectionCallback[] = []
  private listenersDisconnection: Callback[] = []

  constructor() {
    super()
    this.on('connection', this.emitConnection)
  }

  emitConnection(conn: Peer.DataConnection) {
    console.log('CONNECTION')

    if (Object.keys(peer.connections).length > 1) {
      conn.on('open', function () {
        conn.send('Already connected to another client')
        setTimeout(function () {
          conn.close()
        }, 500)
      })

      return
    }

    conn.on('open', function () {
      console.log('CONN OPEN')
    })
    conn.on('data', function (data) {
      console.log('CONN DATA', data)
    })
    conn.on('close', () => {
      console.log('CONN CLOSE')

      this.emitDisconnection()
    })

    this.listenersConnection.forEach(cb => cb(conn))
  }

  eventConnection(cb: ConnectionCallback) {
    this.listenersConnection.push(cb)
  }

  emitDisconnection() {
    console.log('DISCONNECTION')
    this.listenersDisconnection.forEach(cb => cb())
  }

  eventDisconnection(cb: () => void) {
    this.listenersDisconnection.push(cb)
  }
}

const peer = new MyPeer()

peer.on('open', function () {
  console.log('OPEN')
})
peer.on('close', function () {
  console.log('CLOSE')
})

peer.on('disconnected', function () {
  console.log('DISCONNECTED')
})

peer.on('error', function (err) {
  console.log("PEER ERROR", err)
})

export default peer