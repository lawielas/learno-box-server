import { Router } from "express";
import { login, register } from "../controllers/userAuthController";


const userRouter = Router()

userRouter.post('/signup', register)
userRouter.post('/signin', login)
// userRouter.get('/dashboard/:id', )

export default userRouter