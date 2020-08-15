import Peer from 'peerjs'

function setPeerId(id: string) {
  const inputs = document.getElementsByTagName('input')
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    if (input.id == "peer-id") {
      input.value = id
      break
    }
  }
}

const peer = new Peer()

peer.on('open', function () {
  setPeerId(peer.id)
})

peer.on('close', function () {
  console.log('Connection destroyed')
})

peer.on('disconnected', function () {
  console.log('DISCONNECTED')
})

peer.on('error', function (err) {
  console.log("ERROR PEER", err)
})

export default peer