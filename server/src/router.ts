import express = require('express')
const router = express.Router()
import {
    renderHomePage,
    createPun,
    randomPun,
    renderGame,
    findOpponent
} from './controllers/controller'

router.get('/', renderHomePage)

router.post('/pun', createPun)
router.get('/random-pun', randomPun)

router.get('/game', renderGame)
router.post('/find-opponent', findOpponent)

export default router
