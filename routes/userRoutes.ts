import { Router } from "express";
import { login, profile, register } from "../controllers/userAuthController";
import { checkAuthToken } from "../middlewares/auth";


const userRouter = Router()

userRouter.post('/signup', register)
userRouter.post('/signin', login)
userRouter.get('/profile', checkAuthToken, profile)

export default userRouter