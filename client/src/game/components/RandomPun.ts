import { Slim } from 'slim-js'
import { tag, useShadow, template } from 'slim-js/Decorators'

import Pun from './Pun'

interface PunLabels {
  question: string,
  answer: string
}

@tag('x-random-pun')
@useShadow(false)
@template(
  `<div class="card text-center border-primary">
  <div class="card-body">
  <button s:id="change" class="btn btn-primary mb-2">Change</button>
  <x-pun id="pun" bind:question="pun.question" bind:answer="pun.answer"></x-pun>
  </div>
  </div>`)
export default class RandomPun extends Slim {
  private change = this.find(`#change`)
  private pun: PunLabels = {
    question: Pun.DEFAULT,
    answer: Pun.DEFAULT
  }

  onCreated() {
    this.changePun()
  }

  onRender() {
    this.change.addEventListener('click', this.changePun.bind(this))
  }

  getRandomPun() {
    return fetch('/random-pun', {
      method: 'GET'
    }).then<PunLabels>(res =>
      res.json().catch(() => {
        console.log('Erro ao obter trocadilho aleatório...')
      })
    )
  }

  changePun() {
    this.getRandomPun().then(pun => {
      this.pun = pun
    })
  }
}