import express from 'express'
import userRouter from './adapters/primary/http/routes/userRoutes'
import AppError from './utils/AppError'
import globalErrorHandler from './adapters/primary/http/controllers/ErrorController'
import dotenv from 'dotenv'
import bookRouter from './adapters/primary/http/routes/bookRoutes'
import authorRouter from './adapters/primary/http/routes/authorRoutes'

export const app = express()

app.use(express.json())

dotenv.config()

const prefix = '/api/v1'
app.use(`${prefix}/users`, userRouter)
app.use(`${prefix}/books`, bookRouter)
app.use(`${prefix}/authors`, authorRouter)

//If app not found any api route
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

//handling global error
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler)

export default app
