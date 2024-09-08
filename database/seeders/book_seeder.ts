import Book from '#models/book'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {

    const user = await User.query().select('id').first()
    // Write your database queries inside the run method
    await Book.createMany([
      {
        title: 'The Catcher in the Rye',
        cover: 'https://images.gr-assets.com/books/1391491536l/2657.jpg',
        author: 'J. D. Salinger',
        resume: 'The Catcher in the Rye is a novel by J. D. Salinger. It is regarded as one of the best-selling novels in the English language.',
        userId: user?.id
      },
      {
        title: 'The Great Gatsby',
        cover: 'https://images.gr-assets.com/books/1490528560l/4671.jpg',
        author: 'F. Scott Fitzgerald',
        resume: 'The Great Gatsby is a novel by F. Scott Fitzgerald, published in 1925. It is one of the most popular novels of all time.',
        userId: user?.id
      },
      {
        title: 'To Kill a Mockingbird',
        cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
        author: 'Harper Lee',
        resume: 'To Kill a Mockingbird is a novel by Harper Lee, published in 1960. It is one of the most popular novels of all time.',
        userId: user?.id
      },
      {
        title: 'Pride and Prejudice',
        cover: 'https://images.gr-assets.com/books/1348992456l/13482.jpg',
        author: 'Jane Austen',
        resume: 'Pride and Prejudice is a novel by Jane Austen, published in 1813. It is one of the most popular novels of all time.',
        userId: user?.id
      },


    ])
  }
}
