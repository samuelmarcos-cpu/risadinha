const express = require('express')
const router = express.Router()
const controller = require('./controllers/controller')

router.get('/', controller.renderHomePage)

router.post('/pun', controller.createPun)

router.get('/about', controller.renderAboutPage)

router.get('/game', controller.renderGame)

router.post('/find-opponent', controller.findOpponent)

module.exports = router
