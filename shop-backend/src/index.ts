/* eslint-disable @typescript-eslint/no-require-imports */
import { loadEnv } from '@common/loadEnv/loadEnv';
loadEnv(process.env.NODE_ENV || 'local');
import Hapi from '@hapi/hapi';
import config from 'config';
import { logger } from '@common/logger';
import routes from '@routes/routes';
import { plugins } from '@common/plugins/plugin';
import { mongoConnect } from '@common/mongo/dbConnect/mongoConnect';

// server configuration
const server = new Hapi.Server({
  port: process.env.PORT,
  host: config.get('app.host'),
  routes: {
    cors: {
      origin: config.get('app.domains.allowed'),
    },
    validate: {
      failAction: async (
        _request: Hapi.Request<Hapi.ReqRefDefaults>,
        _h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>,
        err?: Error,
      ) => {
        logger.debug(err);
        throw err;
      },
    },
  },
});

const start = async () => {
  await server.register(plugins);
  server.route(routes);
  logger.info('Server is starting...');
  await server.start();
};
process.on('unhandledRejection', (err: Error) => {
  logger.error(err);
  logger.info('Server is stopped...');
  process.exit(1);
});

const init = async () => {
  await start();
};

(async () => {
  try {
    await mongoConnect();
    await init();
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();

export default server;
