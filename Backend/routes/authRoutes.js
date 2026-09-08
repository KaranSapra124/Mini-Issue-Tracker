import Router from 'express'
import { userLogin, userSignIn } from '../controller/authController.js'

const authRouter = Router()

authRouter.post("/signin", userSignIn)
authRouter.post("/login", userLogin)

export default authRouter