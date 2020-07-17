const redis = require('../repositories')
const { isUuid } = require('uuidv4')

const key = 'comedians'

function validateId (id) {
  const empty = value => value == undefined || value == null || value == ''
  console.log('isUuid', id, isUuid(id))
  const valid = empty(id) == false && isUuid(id)
  if (empty(id) || valid == false) throw new Error('invalid id')
  return valid
}

class Comedian {
  set id (id) {
    validateId(id)
    this._id = id
  }
  get id () {
    return this._id
  }

  constructor (id) {
    this.id = id
  }

  push () {
    return redis.lpush(key, this.id)
  }

  remove () {
    return redis.lrem(key, 0, this.id)
  }
}

module.exports = {
  validateId,
  Comedian,
  Comedians: {
    brpop: (...args) => redis.brpop(key, ...args)
  }
}
