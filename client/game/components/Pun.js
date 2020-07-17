import 'slim-js'
import 'slim-js/directives/all'

const PUN = Object.freeze({
  QUESTION: 'Question',
  ANSWER: 'Answer'
})

Slim.tag(
  'x-pun',
  `<div class="card text-center border-primary m-5">
    <div class="card-body">
      <h5 class="card-title">{{title(questionView)}}</h5>
      <p s:if="questionView" class="card-text">{{question}}</p>
      <p s:if="!questionView" class="card-text">{{answer}}</p>
      <button s:id="toggle" class="btn btn-primary">Turn</button
    </div>
  </div>`,
  class Pun extends Slim {
    onBeforeCreated () {
      this.questionView = true
    }

    onRender () {
      this.question = this.getAttribute('question')
      this.answer = this.getAttribute('answer')

      this.toggle.addEventListener('click', () => {
        this.questionView = this.questionView == false
      })
    }

    title (toggle) {
      return toggle ? PUN.QUESTION : PUN.ANSWER
    }
  }
)
