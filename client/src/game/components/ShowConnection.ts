import { Slim } from 'slim-js'
import { tag, useShadow } from 'slim-js/Decorators'

import peer from '../peer'

@tag('x-show-connection')
@useShadow(false)
export default class PeerMenu extends Slim {
  private slotTrue?: Element
  private slotFalse?: Element

  onBeforeCreated() {
    const show = () => this.toggle(false)
    const hide = () => this.toggle(true)

    peer.on('connection', show)
    peer.eventConnection(show)

    // peer.on('disconnect', hide)
    peer.eventDisconnection(hide)
  }

  onRender() {
    this.slotTrue = this.find("slot[name=true]")
    this.slotFalse = this.find("slot[name=false]")

    this.toggle(peer.connections)
  }

  toggle(show: boolean) {
    console.log("TOGGLE", show)
    this.innerHTML = ""

    if (show) {
      this.slotFalse?.remove()
      this.slotTrue && this.appendChild(this.slotTrue)
    } else {
      this.slotTrue?.remove()
      this.slotFalse && this.appendChild(this.slotFalse)
    }
  }
}