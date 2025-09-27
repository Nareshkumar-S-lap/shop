import { ENV_KEYS } from '@common/constants/constant';
import { logger } from '@common/logger';
import { EnvVars } from '@common/types/types';

function getEnv(key: string, required = true): string {
  const value = process.env[key];
  if (required && !value) {
    logger.error(` Missing environment variable: ${key}`);
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value!;
}

const env: EnvVars = {
  PORT: parseInt(getEnv(ENV_KEYS.PORT)),
  MONGO_URI: getEnv(ENV_KEYS.MONGO_URI),
  DB_NAME: getEnv(ENV_KEYS.DB_NAME),
};

export const Env = Object.freeze(env);
