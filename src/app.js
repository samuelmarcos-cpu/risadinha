const express = require('express')
const router = require('./router')
const buildPeerServer = require('./config/peerServer')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.use('/', router)

app.set('views', 'views')
app.set('view engine', 'hbs')

const server = app.listen(process.env.PORT || 3186, () => {
  console.log('Servidor rodando...')
})

app.use('/peerjs', buildPeerServer(server))
