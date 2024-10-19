import app from './app'
import { connectToMongoDB } from './adapters/secondary/db/mongoose/MongoDBConnection'
import { connectToSequelize } from './adapters/secondary/db/sequlizer/MySqlConnection'
import createAdminUser from './adapters/secondary/db/sequlizer/scripts/createAdminUser'
import syncSequelizeModels from './adapters/secondary/db/sequlizer/synchronizeModels'
import { config, isTest } from './config/config'

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
// if running test then don't run the server here
if (!isTest) {
  startServer()
}
export { startServer, app }
