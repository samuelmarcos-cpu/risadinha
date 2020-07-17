const express = require('express')
const cors = require('cors')
const buildPeerServer = require('./config/peerServer')
const router = require('./router')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.use(cors())
app.use('/', router)

app.set('views', 'views')
app.set('view engine', 'hbs')

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando...')
})

app.use('/peerjs', buildPeerServer(server))
