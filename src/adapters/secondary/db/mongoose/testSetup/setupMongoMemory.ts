import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongo: MongoMemoryServer

export const setupMongoTestDB = async () => {
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()
  await mongoose
    .connect(mongoUri)
    // eslint-disable-next-line no-console
    .then(() => console.log('Test MongoDB connected'))
}

export const teardownMongoTestDB = async () => {
  await mongoose.connection.dropDatabase() // Clean up after each test
  await mongoose.disconnect()
  await mongo.stop()
}
