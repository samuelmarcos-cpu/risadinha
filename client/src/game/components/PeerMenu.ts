import { Slim } from 'slim-js'
import { tag, useShadow, template } from 'slim-js/Decorators'

import peer from '../peer'

@tag('x-peer-menu')
@useShadow(false)
@template(
  `<div class="container-fluid">
  <div class="row justify-content-center">
  <div class="form-group">
  <label for="peer">Seu Peer ID</label>
  <input type="text" class="form-control" id="peer-id" name="peer-id" readonly />
  </div>
  </div>
  <div class="row justify-content-around align-items-center">
  <div class="form-group">
  <label for="">Jogue com seus amigos</label>
  <div class="input-group">
  <input type="text" id="peer-friend" name="peer-friend" class="form-control" placeholder="Insira o Peer ID do seu amigo" />
  <div class="input-group-prepend">
  <button id="connect" name="connect" class="btn btn-primary">ir</button>
  </div>
  </div>
  </div>
  <button class="btn btn-primary">Encontre um oponente</button>
  </div>
  </div>`)
export default class PeerMenu extends Slim {
  private peerLabel?: Element

  onBeforeCreated() {
    peer.on('open', id => {
      this.peerLabel?.setAttribute('value', id)
    })
  }

  onRender() {
    this.peerLabel = this.find("#peer-id")

    this.find('#connect').addEventListener('click', () => {
      console.log("CONNECTION FRIEND")
      const inputPeerFriend = this.getElementsByTagName("input").namedItem('peer-friend')
      if (inputPeerFriend) {
        const peerFriend = inputPeerFriend.value
        peer.emitConnection(peer.connect(peerFriend || ''))
        inputPeerFriend.value = ''
      }
    })
  }
}