const express = require('express')
const { ExpressPeerServer } = require('peer')
const redis = require('./repositories/index')

const app = express()
const router = require('./router')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'hbs')

app.use('/', router)

const server = app.listen(3000, () => {
  console.log('Servidor rodando...')
})

const peerServer = ExpressPeerServer(server, {
  path: '/myapp'
})

peerServer.on('connection', client => {
  redis.lpush('comedians', client.getId())
  console.log('connection', client.getId())
})

peerServer.on('disconnect', client => {
  redis.lrem('comedians', 0, client.getId())
  console.log('disconnect', client.getId())
})

app.use('/peerjs', peerServer)
