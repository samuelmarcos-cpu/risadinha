const redis = require('../repositories')

const key = 'comedians'

function validateId (id) {
  const test = id == undefined || id == null || id == ''
  if (test) {
    throw new Error('invalid id')
  }
  return test == false
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
