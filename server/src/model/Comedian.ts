import { Tedis } from 'tedis'

export default class Comedian {
  static readonly KEY = 'comedians'

  private redis: Tedis
  private id: string

  static validateId(id: string) {
    if (id.trim() == "") throw new Error('invalid id')
  }

  getId() {
    return this.id
  }

  constructor(redis: Tedis, id: string) {
    this.redis = redis
    Comedian.validateId(id)
    this.id = id.trim()
  }

  async push() {
    await this.remove()
    return this.redis.lpush(Comedian.KEY, this.getId())
  }

  remove() {
    return this.redis.lrem(Comedian.KEY, 0, this.getId())
  }
}