// Update with your config settings.
require('dotenv').config()

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.APP_DB_HOST,
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER,
    port: process.env.APP_DB_PORT,
    password: process.env.APP_DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
