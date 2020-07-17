const express = require('express')
const cors = require('cors')
const buildPeerServer = require('./config/peerServer')

const app = express()
const router = require('./router')

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.set('views', 'views')
app.set('view engine', 'hbs')

app.use('/', router)

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando...')
})

app.use('/peerjs', buildPeerServer(server))
