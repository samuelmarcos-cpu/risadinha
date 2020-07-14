const redis = require('redis')

const client = redis.createClient({
  port: 6379,
  host: '192.168.99.100'
})

// client.auth('password', function (err) {
//   if (err) throw err
// })

// client.on('error', function (err) {
//   console.log('Error ' + err)
// })

// client.on('connect', function () {
//   console.log('Connected to Redis')
// })

module.exports = client
