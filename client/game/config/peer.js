import os from 'os'

module.exports = {
  host: os.hostname() || 'localhost',
  port: process.env.PORT || 3000,
  path: '/peerjs/myapp',
  debug: 0
}
