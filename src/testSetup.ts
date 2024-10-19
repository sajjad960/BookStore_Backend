import { teardownMongoTestDB } from './adapters/secondary/db/mongoose/MongoDBConnection'
import { teardownSequelizeTestDB } from './adapters/secondary/db/sequlizer/MySqlConnection'
import { startServer } from './server'
import { loginAsAdmin } from './tests/integration/testUtils/authTestUtils'

let adminToken: string
beforeAll(async () => {
  await startServer()
  adminToken = await loginAsAdmin()
})

afterAll(async () => {
  await teardownMongoTestDB()
  await teardownSequelizeTestDB()
  // eslint-disable-next-line no-console
  console.log('Tests completed')
})
export { adminToken }
