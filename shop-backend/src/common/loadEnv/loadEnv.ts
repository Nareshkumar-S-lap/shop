import dotenv from 'dotenv';
import config from 'config';
import { ENV } from '@common/constants/constant';
import { logger } from '@common/logger';

export function loadEnv(env: string = ENV.LOCAL) {
  const filename = ENV.LOCAL ? '.env' : `.env.${env}`;
  logger.info(`Loading environment variables from ${filename}`);
  dotenv.config({ path: filename, quiet: !config.get('app.env.log') });
}
