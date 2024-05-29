import express from 'express';
import { connectToMongoDB } from './adapters/secondary/db/mongoose/MongoDBConnection';
import { config } from './config/config';
// import userRouter from "./adapters/primary/http/routes/userRoutes"

const app = express();

app.use(express.json());

// const prefix = '/api/v1'
// app.use(`${prefix}/users`, userRouter)

const startServer = async () => {
  await connectToMongoDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
