import Knex = require('knex')
import config from '../../knexfile'
const knex = Knex(config)

export default class Pun {
  private question: string
  private answer: string
  private errors: string[]

  getErrors() {
    return this.errors
  }

  constructor(question: string, answer: string) {
    this.question = question
    this.answer = answer
    this.errors = []
  }

  validateUserInput() {
    if (this.question == '') {
      this.errors.push('Por favor entre com a pergunta do trocadilho')
    }
    if (this.answer == '') {
      this.errors.push('Por favor entre com a resposta do trocadilho')
    }
  }

  save() {
    return knex('pun').insert({
      question: this.question,
      answer: this.answer
    })
  }
}