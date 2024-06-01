import express from 'express'
import { connectToMongoDB } from './adapters/secondary/db/mongoose/MongoDBConnection'
import { config } from './config/config'
import userRouter from './adapters/primary/http/routes/userRoutes'
import AppError from './utils/AppError'
import globalErrorHandler from './adapters/primary/http/controllers/ErrorController'
import dotenv from 'dotenv'

const app = express()

app.use(express.json())

dotenv.config()

const prefix = '/api/v1'
app.use(`${prefix}/users`, userRouter)

//If app not found any api route
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

//handling global error
app.use(globalErrorHandler)

const startServer = async () => {
  await connectToMongoDB()

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

startServer()
