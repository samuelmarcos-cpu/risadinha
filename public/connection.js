let lastPeerId, conn

function configConnection (conn) {
  conn.on('open', function () {
    // status.innerHTML = 'Connected to: ' + conn.peer
    console.log('Connected to: ' + conn.peer)

    // Check URL params for comamnds that should be sent immediately
    // var command = getUrlParam('command')
    // if (command) conn.send(command)
  })
  // Handle incoming data (messages only since this is the signal sender)
  conn.on('data', function (data) {
    // addMessage('<span class="peerMsg">Peer:</span> ' + data)
    console.log('DATA', data)
  })
  conn.on('close', function () {
    // status.innerHTML = 'Connection closed'
  })

  return conn
}

const peer = new Peer(null, {
  host: 'localhost',
  port: 3000,
  path: '/peerjs/myapp',
  debug: 2
})

peer.on('open', function (id) {
  // Workaround for peer.reconnect deleting previous id
  if (peer.id === null) {
    console.log('Received null id from peer open')
    peer.id = lastPeerId
  } else {
    lastPeerId = peer.id
  }

  console.log('ID: ' + peer.id)
  // recvId.innerHTML = 'ID: ' + peer.id
  // status.innerHTML = 'Awaiting connection...'

  fetch('http://localhost:3000/find-opponent', {
    method: 'POST',
    body: JSON.stringify({
      id: peer.id
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(res => {
    res.json().then(({ id }) => {
      if (id != null) {
        conn = peer.connect(id)
        configConnection(conn)
      }
    })
  })
})

peer.on('close', function () {
  conn = null
  // status.innerHTML = 'Connection destroyed. Please refresh'
  console.log('Connection destroyed')
})

peer.on('connection', function (c) {
  // Allow only a single connection
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
  // status.innerHTML = 'Connected'
  // ready()
})

peer.on('disconnected', function () {
  // status.innerHTML = 'Connection lost. Please reconnect'
  console.log('Connection lost. Please reconnect')

  // Workaround for peer.reconnect deleting previous id
  peer.id = lastPeerId
  peer._lastServerId = lastPeerId
  peer.reconnect()
})

peer.on('error', function (err) {
  console.log(err)
  alert('' + err)
})
