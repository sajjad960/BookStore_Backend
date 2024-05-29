import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: string | number;
    mongodbUri: string;
  }

export const config:Config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb',
};