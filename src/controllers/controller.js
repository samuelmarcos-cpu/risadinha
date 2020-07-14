const redis = require('../repositories')
const axios = require('axios')
const API_KEY = '383126a3c11209ee222def0c28b6340e'

const Weather = require('../model/Weather')
const Pun = require('../model/Pun')

exports.renderHomePage = (req, res) => {
  res.render('index')
}

exports.getWeather = (req, res) => {
  const weather = new Weather(req.body.city)
  weather.validateUserInput()
  if (weather.errors.length) {
    res.render('index', {
      error: weather.errors.toString()
    })
  } else {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${weather.data}&appid=${API_KEY}&units=metric`
    axios
      .get(url)
      .then(response => {
        res.render('index', {
          weather: `It is currently ${response.data.main.temp} in ${response.data.name}`
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

exports.renderAboutPage = (req, res) => {
  res.render('About')
}

exports.createPun = (req, res) => {
  const result = req.body
  const pun = new Pun(result.question, result.answer)
  pun.validateUserInput()
  if (pun.errors.length) {
    res.render('index', {
      error: pun.errors
    })
  } else {
    pun
      .save()
      .then(() => {
        res.render('index', {
          pun: `Trocadilho enviado com sucesso`
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

exports.renderGame = (req, res) => {
  res.render('game')
}

exports.findOpponent = (req, res) => {
  const clientId = req.body.id
  redis.brpop('comedians', 100, (err, [key, id]) => {
    console.log('ERR', err)
    console.log('POP', id)
    if (clientId == id) {
      redis.lpush('comedians', id)
      console.log('PUSH', id)
      res.json({ id: null })
    } else {
      redis.lrem('comedians', 0, clientId)
      res.json({ id })
    }
  })
}
