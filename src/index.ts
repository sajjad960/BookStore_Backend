import express from 'express'
import { connectToMongoDB } from './adapters/secondary/db/mongoose/MongoDBConnection'
import { config } from './config/config'
import userRouter from './adapters/primary/http/routes/userRoutes'
import AppError from './utils/AppError'
import globalErrorHandler from './adapters/primary/http/controllers/ErrorController'
import dotenv from 'dotenv'
import { connectToSequelize } from './adapters/secondary/db/sequlizer/MySqlConnection'
import syncSequelizeModels from './adapters/secondary/db/sequlizer/synchronizeModels'
import bookRouter from './adapters/primary/http/routes/bookRoutes'
import authorRouter from './adapters/primary/http/routes/authorRoutes'
import createAdminUser from './adapters/secondary/db/sequlizer/scripts/createAdminUser'

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
// eslint-disable-next-line @typescript-eslint/ban-types
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler)
const startServer = async () => {
  await connectToMongoDB()
  await connectToSequelize()
  await syncSequelizeModels()
  await createAdminUser()

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${config.port}`)
  })
}

startServer()
