import {
  setupMongoTestDB,
  teardownMongoTestDB,
} from './adapters/secondary/db/mongoose/testSetup/setupMongoMemory'

beforeAll(async () => {
  await setupMongoTestDB()
})

afterAll(async () => {
  await teardownMongoTestDB()
})
