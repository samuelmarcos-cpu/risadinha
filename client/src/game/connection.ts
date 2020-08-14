import Peer from 'peerjs'

function configConnection(conn: Peer.DataConnection) {
  conn.on('open', function () {
    console.log('OPEN: ' + conn.peer)
  })
  conn.on('data', function (data) {
    console.log('DATA', data)
  })
  conn.on('close', function () {
    console.log('CLOSE', 'Connection closed')
  })
  return conn
}

function configCall(peer: Peer, id: string, stream: MediaStream, video: HTMLVideoElement) {
  const call = peer.call(id, stream)
  call.answer(stream)
  call.on('stream', function (remoteStream) {
    video.srcObject = remoteStream
    video.play()
  })
  return call
}

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    console.log('getUserMedia', stream)

    const peer = new Peer
    const videoRemote = document.getElementsByTagName('video')[0]

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
            console.log("RESPONSE", id)
            configConnection(peer.connect(id))
            configCall(peer, id, stream, videoRemote)
          })
          .catch(e => {
            console.log('Esperando conexão...')
          })
      })
    })

    peer.on('close', function () {
      console.log('Connection destroyed')
    })

    peer.on('connection', function (conn) {
      console.log('KEYS', Object.keys(peer.connections).length)

      if (Object.keys(peer.connections).length > 1) {
        conn.on('open', function () {
          conn.send('Already connected to another client')
          setTimeout(function () {
            conn.close()
          }, 500)
        })
        return
      }

      configConnection(conn)
      console.log('Connected to: ' + conn.peer)
    })

    peer.on('disconnected', function () {
      console.log('Connection lost. Please reconnect')
    })

    peer.on('call', function (call) {
      call.answer(stream)
      call.on('stream', function (remoteStream) {
        // 2x ￣へ￣
        videoRemote.srcObject = remoteStream
      })
    })

    peer.on('error', function (err) {
      console.log(err)
    })
  }).catch(error => {
    console.log("ERROR GetUserMedia")
  })