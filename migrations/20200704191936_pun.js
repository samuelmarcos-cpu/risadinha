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
      return knex('pun').insert([
        {
          question: 'Melhor jogo 2D do Sonic?',
          answer: 'Melhor jogo 2D do Sonic?'
        },
        {
          question: 'Melhor Assassins Creed',
          answer: 'Melhor Assassins Creed'
        }
      ])
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('pun')
}
