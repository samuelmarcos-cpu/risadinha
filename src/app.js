const express = require('express')
const cors = require('cors')
const router = require('./router')

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use('/', router)

app.set('views', 'views')
app.set('view engine', 'hbs')

app.listen(process.env.PORT || 3186, () => {
  console.log('Servidor rodando...')
})
