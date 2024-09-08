import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method


    await User.createMany([
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'Qp6nN@example.com',
        password: '12345678'
  },
  {
    firstname: 'Jane',
    lastname: 'Doe',
    email: '4bUeh@example.com',
     password: '12345678'
  },
  {
    firstname: 'Joe',
    lastname: 'Doe',
    email: '9k4iZ@example.com',
     password: '12345678'
  },

    ])
  }
}
