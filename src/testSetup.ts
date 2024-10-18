import {
  setupMongoTestDB,
  teardownMongoTestDB,
} from './adapters/secondary/db/mongoose/testSetup/setupMongoMemory'
import { setupSequelizeTestDB } from './adapters/secondary/db/sequlizer/testSetup/setupSequelizeTest'

beforeAll(async () => {
  await setupMongoTestDB()
  await setupSequelizeTestDB()
})

afterAll(async () => {
  await teardownMongoTestDB()
})
