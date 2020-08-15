import { Slim } from 'slim-js'
import { tag, useShadow, template } from 'slim-js/Decorators'
import 'slim-js/directives/if'

@tag('x-pun')
@useShadow(false)
@template(
  `<div class="card text-center border-primary">
    <div class="card-body">
      <h5 class="card-title">{{getTitle(showAnswer)}}</h5>
      <p s:if="!showAnswer" class="card-text">{{question}}</p>
      <p s:if="showAnswer" class="card-text">{{answer}}</p>
      <button s:id="toggle" class="btn btn-primary">Turn</button>
    </div>
  </div>`)
export default class Pun extends Slim {
  static readonly DEFAULT = ""
  static readonly QUESTION = "Question"
  static readonly ANSWER = "Answer"

  private question = Pun.DEFAULT
  private answer = Pun.DEFAULT
  private toggle = this.find(`#toggle`)
  private showAnswer = false

  onRender() {
    this.setQuestion(this.getAttribute('question') || Pun.DEFAULT)
    this.setAnswer(this.getAttribute('answer') || Pun.DEFAULT)

    this.toggle.addEventListener('click', this.togglePun.bind(this))
  }

  setQuestion(question: string) {
    this.question = question
  }

  setAnswer(answer: string) {
    this.answer = answer
  }

  getTitle(toggle: boolean) {
    return toggle ? Pun.ANSWER : Pun.QUESTION
  }

  showQuestion() {
    this.showAnswer = false
  }

  togglePun() {
    this.showAnswer = this.showAnswer == false
  }
}