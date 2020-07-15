// Update with your config settings.
require('dotenv').config()
const redis = require('redis')

const client = redis.createClient({
  host: process.env.APP_REDIS_HOST,
  port: process.env.APP_REDIS_PORT
})

client.auth(process.env.APP_REDIS_PASSWORD, function (err) {
  if (err) throw err
})

// client.on('error', function (err) {
//   console.log('Error ' + err)
// })

// client.on('connect', function () {
//   console.log('Connected to Redis')
// })

module.exports = client
