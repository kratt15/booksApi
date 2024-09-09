/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//
 const AuthController = () => import('#controllers/auth_controller')
 const BookController = () => import('#controllers/books_controller')

router.get('/home', async () => {
  return {
    hello: 'world',

  }
}).use(middleware.auth())

router.group( () => {

  router.post('/login', [AuthController, 'login'])

  router.post('/register', [AuthController, 'register'])

  router.get('/books', [BookController, 'index'])

  router.get('/books/:id', [BookController, 'show'])

  router.post('/books/create', [BookController, 'store']).use(middleware.auth())

  router.put('/books/:id/update', [BookController, 'update']).use(middleware.auth())

  router.delete('/books/:id/destroy', [BookController, 'destroy']).use(middleware.auth())

}).prefix('/api/v1')

