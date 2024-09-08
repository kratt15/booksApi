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

router.get('/home', async () => {
  return {
    hello: 'world',

  }
}).use(middleware.auth())

router.group( () => {

  router.post('/login', [AuthController, 'login'])

  router.post('/register', [AuthController, 'register'])

}).prefix('/api/v1')

