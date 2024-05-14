import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { User } from "../models/user"

export const register = async (req: Request, res: Response) => {
    try {
        const user = req.body
        const { name, username, email, password } = user

        const emailExists = await User.findOne({
            email: email
        })

        if(emailExists) {
            return res.status(400).json({
                status: 400,
                message: "Email already exists"
            })
        }

        const newUser = await User.create({
            name,
            username,
            email,
            password
        })
        
        res.status(200).json({
            status: 201,
            success: true,
            message: "User created successfully",
            user: newUser
        })

    } catch (error: any) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message.toString()
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = req.body
        const {email, password} = user

        const userExists = await User.findOne({
            email: email
        })

        if(!userExists) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatched = userExists?.password === password

        if(!isPasswordMatched) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "wrong password"
            })
        }

        const payload = {
            _id: userExists?._id,
            email: userExists.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string,
            {
               expiresIn: "1d" 
            }
        )

        res.status(200).json({
            status: 200,
            success: true,
            message: "login successfull",
            token: token
        })

    } catch(error: any) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message.toString()
        })
    }
}

export const profile = async (req: Request, res: Response) => {
    const {id} = req.body.user

    try {
        const user = await User.findOne({_id: id})

        if(!user) {
            return res.status(404).json({
                status: 404,
                success: true,
                message: "User not found"
            })
        }

        return res.status(200).json({
            status: 200,
            success: true,
            user
        })
    } catch (error) {
        
    }
}