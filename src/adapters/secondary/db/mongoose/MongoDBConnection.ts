import mongoose from 'mongoose'
import {configDatabases } from '../../../../config/config'

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(configDatabases.MONGODB_URI)
    // eslint-disable-next-line no-console
    console.log('MongoDB connected')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB', error)
    process.exit(1)
  }
}
