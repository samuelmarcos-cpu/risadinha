const Pun = require('../model/Pun')
const { Comedians, Comedian } = require('../model/Comedians')

exports.renderHomePage = (req, res) => {
  res.render('index')
}

exports.createPun = (req, res) => {
  const { question, answer } = req.body
  let options = {}

  const empty = vl => vl == undefined || vl == null || vl == ''
  if (empty(question) || empty(answer)) {
    res.status(400).render('index', options)
  }

  const pun = new Pun(question, answer)
  pun.validateUserInput()
  if (pun.errors.length) {
    res.status(400)
    options.error = pun.errors
  } else {
    pun
      .save()
      .then(() => {
        res.status(201)
        options.pun = `Trocadilho enviado com sucesso`
      })
      .catch(error => {
        console.log(error)
      })
  }
  res.render('index', options)
}

exports.renderGame = (req, res) => {
  res.render('game')
}

exports.findOpponent = (req, res) => {
  let payload = { id: '' }
  try {
    const comedian = new Comedian(req.body.id)
    Comedians.brpop(100, (err, [key, id]) => {
      console.log('ERR', err)
      console.log('POP', id)
      if (comedian.id == id) {
        comedian.push()
        res.status(204)
        console.log('PUSH', id)
      } else {
        comedian.remove()
        payload.id = id
        res.status(200)
      }
      res.json(payload)
    })
  } catch (e) {
    res.status(400).json(payload)
    console.log('ERROR', e)
  }
}
