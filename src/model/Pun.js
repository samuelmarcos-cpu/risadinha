const config = require('../../knexfile')
const knex = require('knex')(config)

const Pun = function (question, answer) {
  this.question = question
  this.answer = answer
  this.errors = []
}

Pun.prototype.validateUserInput = function () {
  if (this.question == '') {
    this.errors.push('Por favor entre com a pergunta do trocadilho')
  }
  if (this.answer == '') {
    this.errors.push('Por favor entre com a resposta do trocadilho')
  }
}

Pun.prototype.save = function () {
  return knex('pun').insert({
    question: this.question,
    answer: this.answer
  })
}

module.exports = Pun
