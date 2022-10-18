import { Router } from 'express'
import authRouter from './AuthRoute'
import userRouter from './UserRoute'

const router = Router()

router.use(authRouter)
router.use(userRouter)

export default router
