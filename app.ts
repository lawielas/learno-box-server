import express from 'express'
import { Application } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
dotenv.config()

const app: Application = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//routes
app.use('/api', userRouter)

const PORT: number = 8000

app.listen(PORT, async () => {
    console.log(`Server connected on port ${PORT}`)
    try {
        await mongoose.connect(
            process.env.DATABASE_URL as string
        )
        console.log("Connected to Database")
    } catch (error) {
        console.log('Error connecting to database')
    }
})