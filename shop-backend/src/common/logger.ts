import { createLogger } from '@thinkcove-lib/base';
import config from 'config';
export const logger = createLogger({
  level: config.get<string>('app.logLevel'),
});
