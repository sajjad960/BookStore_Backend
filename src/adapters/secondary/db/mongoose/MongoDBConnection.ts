import mongoose from 'mongoose';
import { config } from '../../../../config/config';

export const connectToMongoDB = async () => {
  try {
    console.log(config.mongodbUri);
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
