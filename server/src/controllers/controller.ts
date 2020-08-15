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

export const createPun: RequestHandler<any, any, {
  question: string,
  answer: string
}> = async (req, res) => {
  const { question, answer } = req.body
  let options: { pun: string, error: string[] } = {
    pun: "",
    error: []
  }

  const pun = new Pun(question, answer)
  pun.validateUserInput()

  if (pun.getErrors().length) {
    options.error = pun.getErrors()
    res.status(400)
  } else {
    try {
      await pun.save()
    }
    catch (err) {
      console.log("PUN SAVE", err)
      res.status(400)
    }

    options.pun = `Trocadilho enviado com sucesso`
    res.status(201)
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

export const findOpponent: RequestHandler<any, any, { id: string }> = async (req, res) => {
  const payload = req.body

  try {
    const comedian = new Comedian(redis, payload.id)
    const length = await redis.llen(Comedian.KEY)

    if (length == 0) {
      await comedian.push()
      res.status(204)
    } else {
      const [key, id] = await redis.brpop(100, Comedian.KEY)
      payload.id = id || ""
      res.status(200)
    }
  } catch (err) {
    console.log("FIND OPPONENT", err)
    res.status(400)
  }

  res.json(payload)
}