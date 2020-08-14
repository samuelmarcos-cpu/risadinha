import express = require('express')
import cors = require('cors')
import router from './router'

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./../public'))
app.use('/', router)

app.set('views', './../views')
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Servidor rodando... ' + port)
})
