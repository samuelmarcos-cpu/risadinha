import { Config } from 'knex';

import dotenv = require('dotenv')
dotenv.config()

const config: Config = {
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

const url = process.env.DATABASE_URL
if (url) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  config.client = 'pg'
  config.connection = url + '?ssl=true'
} else {
  config.client = 'mysql'
  config.connection = {
    host: process.env.APP_DB_HOST,
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER,
    port: parseInt(process.env.APP_DB_PORT || '0'),
    password: process.env.APP_DB_PASSWORD
  }
}

export default config