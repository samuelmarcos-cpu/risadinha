const express = require('express')
const router = express.Router()
const cors = require('cors')
const controller = require('./controllers/controller')

router.get('/', controller.renderHomePage)

router.post('/pun', controller.createPun)

router.get('/game', controller.renderGame)

router.post('/find-opponent', cors(), controller.findOpponent)

module.exports = router
