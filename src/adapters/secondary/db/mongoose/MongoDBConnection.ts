import mongoose from 'mongoose'
import { databasesConfig } from '../../../../config/config'

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(databasesConfig.MONGODB_URI)
    // eslint-disable-next-line no-console
    console.log('MongoDB connected')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB', error)
    process.exit(1)
  }
}
