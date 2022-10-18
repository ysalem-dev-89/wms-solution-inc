import { login } from '../controllers/AuthController'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/signin', login)
authRouter.post('/signup')

export default authRouter
