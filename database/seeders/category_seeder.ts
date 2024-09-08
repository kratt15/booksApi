import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Category.createMany([
      { name: 'fiction' },
      { name: 'non-fiction' },
      { name: 'poetry' },
      { name: 'biographie' },
      { name: 'histoire' },
      { name: 'sciences' },
      { name: 'fantastique' },
      { name: 'romance' },
      { name: 'thriller' },
      { name: 'mystère' },
      { name: 'horreur' },
      { name: 'jeunesse' },
      { name: 'bande dessinée' },
      { name: 'essai' },
      { name: 'philosophie' },
      { name: 'psychologie' },
      { name: 'sociologie' },
      { name: 'économie' },
      { name: 'politique' }
    ])
  }
}
