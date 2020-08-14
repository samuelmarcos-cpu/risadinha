const fs = require('fs')

const rawdata = fs.readFileSync('migrations/data.json')
const puns = JSON.parse(rawdata)

exports.up = function (knex) {
  return knex.schema
    .createTable('pun', table => {
      table.increments('id').primary()
      table.string('question').notNull()
      table.string('answer').notNull()
      table
        .datetime('date')
        .notNull()
        .defaultTo(knex.fn.now())
    })
    .then(function () {
      return knex('pun').insert(puns)
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('pun')
}
