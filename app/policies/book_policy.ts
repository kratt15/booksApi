import User from '#models/user'
import Book from '#models/book'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class BookPolicy extends BasePolicy {

  async update(user: User, book: Book)
  {
    return user.id === book.userId
  }

  async delete(user: User, book: Book)

  {
    return user.id === book.userId
  }
}
