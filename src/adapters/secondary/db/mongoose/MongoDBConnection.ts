import mongoose from 'mongoose'
import { databasesConfig, isTest } from '../../../../config/config'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo: MongoMemoryServer
export const connectToMongoDB = async () => {
  try {
    if (isTest) {
      mongo = await MongoMemoryServer.create()
      const mongoUri = mongo.getUri()
      await mongoose
        .connect(mongoUri)
        // eslint-disable-next-line no-console
        .then(() => console.log('Test MongoDB connected'))
    } else {
      await mongoose.connect(databasesConfig.MONGODB_URI)
      // eslint-disable-next-line no-console
      console.log('MongoDB connected')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB', error)
    process.exit(1)
  }
}

export const teardownMongoTestDB = async () => {
  await mongoose.connection.dropDatabase() // Clean up after each test
  await mongoose.disconnect()
  await mongo.stop()
}
