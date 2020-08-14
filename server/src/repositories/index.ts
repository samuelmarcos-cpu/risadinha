import { Tedis } from 'tedis'

import dotenv = require('dotenv')
dotenv.config()

const client = new Tedis({
  host: process.env.APP_REDIS_HOST,
  port: parseInt(process.env.APP_REDIS_PORT || "0"),
  password: process.env.APP_REDIS_PASSWORD || ""
})

export default client