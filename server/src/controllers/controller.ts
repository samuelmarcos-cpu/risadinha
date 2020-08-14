import redis from '../repositories'
import { RequestHandler } from 'express'

import Pun from '../model/Pun'
import Comedian from '../model/Comedian'

import Knex from 'knex'
import config from '../../knexfile'
const knex = Knex(config)

export const renderHomePage: RequestHandler = (req, res) => {
  res.render('index')
}

export const createPun: RequestHandler = (req, res) => {
  const { question, answer } = req.body
  let options: { pun: string, error: string[] } = {
    pun: "",
    error: []
  }

  const empty = (vl: any) => vl == undefined || vl == null || vl == ''
  if (empty(question) || empty(answer)) {
    res.status(400).render('index', options)
  }

  const pun = new Pun(question, answer)
  pun.validateUserInput()
  if (pun.getErrors().length) {
    res.status(400)
    options.error = pun.getErrors()
  } else {
    pun
      .save()
      .then(() => {
        res.status(201)
        options.pun = `Trocadilho enviado com sucesso`
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }
  res.render('index', options)
}

export const randomPun: RequestHandler = (req, res) => {
  knex
    .select('question', 'answer')
    .from('pun')
    .orderByRaw('random()')
    .limit(1)
    .then(([pun]) => {
      res.send(pun)
    })
}

export const renderGame: RequestHandler = (req, res) => {
  res.render('game')
}

export const findOpponent: RequestHandler = async (req, res, next) => {
  let payload = { id: req.body.id }
  console.log("START", payload)

  try {
    const length = await redis.llen(Comedian.KEY)
    console.log("LLEN", length)

    if (length == 0) {
      console.log("PUSH")

      const comedian = new Comedian(redis, payload.id)
      await comedian.push()
      res.status(204)
        .json(payload)
    } else {
      const [key, id] = await redis.brpop(100, Comedian.KEY)
      console.log("BRPOP", id)

      res.status(200)
      payload.id = id
      res.json(payload)
    }
  } catch (err) {
    console.log("ERROR", err)
    res.status(400).json(payload)
  }
}