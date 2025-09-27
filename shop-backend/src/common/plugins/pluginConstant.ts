import * as HapiSwagger from 'hapi-swagger';
import config from 'config';
export const SWAGGER: HapiSwagger.RegisterOptions = {
  info: {
    title: 'API Documentation',
    version: config.get<string>('version'),
  },
  tags: [
    {
      name: 'register',
      description: 'Users registration',
    },
  ],
};
