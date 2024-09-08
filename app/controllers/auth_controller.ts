import User from '#models/user'
import { loginValidation, registerValidation } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'


export default class AuthController {


  public async register({request,response}: HttpContext) {
    const user = await request.validateUsing(registerValidation)
    await User.create(user)

    return response.status(201).json({message: 'User created successfully'})
  }
  public async login({request}: HttpContext) {
    const {email,password} = await request.validateUsing(loginValidation)

     const user = await User.verifyCredentials(email,password)

     const token = await User.accessTokens.create(user)

     return token
  }
}
