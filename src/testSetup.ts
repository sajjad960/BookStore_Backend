import { teardownMongoTestDB } from './adapters/secondary/db/mongoose/MongoDBConnection'
import { teardownSequelizeTestDB } from './adapters/secondary/db/sequlizer/MySqlConnection'
import { startServer } from './server'

beforeAll(async () => {
  await startServer()
})

afterAll(async () => {
  await teardownMongoTestDB()
  await teardownSequelizeTestDB()
  // eslint-disable-next-line no-console
  console.log('Tests completed')
})
