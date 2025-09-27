import mongoose from 'mongoose';
import { Env } from '@common/loadEnv/env';
import { logger } from '@common/logger';
import { MongoDBTimeouts } from '@common/types/types';
import config from 'config';

export const mongoConnect = async () => {
  const { buffer, serverSelection, socket } =
    config.get<MongoDBTimeouts>('mongoDB.timeouts');
  try {
    mongoose.set('bufferCommands', true);
    mongoose.set('bufferTimeoutMS', buffer);
    const connection = await mongoose.connect(Env.MONGO_URI, {
      dbName: Env.DB_NAME,
      serverSelectionTimeoutMS: serverSelection,
      socketTimeoutMS: socket,
    });
    logger.info('Connected to MongoDB');
    return connection;
  } catch (e) {
    logger.error('Error connecting to MongoDB:', { e });
    throw e;
  }
};
