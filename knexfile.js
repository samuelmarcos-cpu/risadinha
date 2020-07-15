// Update with your config settings.
require('dotenv').config()

const url = process.env.DATABASE_URL
let config = {}
if (url) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
  config.client = 'pg'
  config.connection = url + '?ssl=true'
} else {
  config.client = 'mysql'
  config.connection = {
    host: process.env.APP_DB_HOST,
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER,
    port: process.env.APP_DB_PORT,
    password: process.env.APP_DB_PASSWORD
  }
}

module.exports = {
  ...config,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
