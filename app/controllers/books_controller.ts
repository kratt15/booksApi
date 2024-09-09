import Book from '#models/book'
import { BookStoreValidation, BookUpdateValidation } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'
import FileUploaderService from '#services/file_uploader_service'
import { inject } from '@adonisjs/core'
import { unlink } from 'fs/promises'

@inject()
export default class BooksController {


  constructor( private readonly fileUploaderService: FileUploaderService){

  }
  /**
   * Display a list of resource
   */


  async index({}: HttpContext) {
    return await Book.query()
    .preload('user', (q) => q.select('id', 'firstname', 'email'))
    .preload('categories', (q) => q.select('id', 'name'))
    .select('id','title','author','user_id')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request , response , auth}: HttpContext) {

    const playload = await request.validateUsing(BookStoreValidation)

    const filePath = await this.fileUploaderService.upload(playload.cover, playload.title, 'books')

    const book = await Book.create({
      title: playload.title,
      author: playload.author,
      resume: playload.resume,
      userId: auth.user!.id,
      cover: filePath
    })
    await book.related('categories').attach(playload.categories)

    return response.status(201).json({message: 'Book created successfully'})
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {

    return await Book.findOrFail(params.id)
  }


  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth, bouncer }: HttpContext) {

    const playload = await request.validateUsing(BookUpdateValidation)

    const book = await Book.findOrFail(params.id)

    await bouncer.with('BookPolicy').authorize('update', book)

    if(playload.cover){

      await unlink(`public/${book.cover}`)

      const filePath = await this.fileUploaderService.upload(playload.cover, '', 'books')

      book.merge({ cover: filePath })

    }

    const updatedBook = await book
    .merge({ title: playload.title, author: playload.author, resume: playload.resume, userId: auth.user!.id})
    .save()

    await updatedBook.related('categories').sync(playload.categories)

    return response.status(201).json({message: 'Book updated successfully'})

  }

  /**
   * Delete record
   */
  async destroy({ params,response,bouncer }: HttpContext) {

     const book = await Book.findOrFail(params.id)

     await bouncer.with('BookPolicy').authorize('update', book)

     await book.related('categories').detach()

     if(!book.cover.startsWith('http') || !book.cover.startsWith('https')){

      await unlink(`public/${book.cover}`)

     }

     await book.delete()

     return response.status(201).json({message: 'Book deleted successfully'})

  }
}
