import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { User } from "../models/user"

export const checkAuthToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization!.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET as string)

        req.body.user = decode
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Invalid request"
        })
    }
}