import os from 'os'

const host = os.hostname()
const port = 3186

console.log('HOST', host)
console.log('PORT', port)

export default {
  host,
  port,
  path: '/peerjs/myapp',
  key: 'peerjs',
  secure: false,
  debug: 3
}
