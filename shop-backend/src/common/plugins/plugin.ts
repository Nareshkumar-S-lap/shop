/* eslint-disable @typescript-eslint/no-require-imports */

import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import * as HapiAuthBearerToken from 'hapi-auth-bearer-token';
import { ServerRegisterPluginObject } from '@hapi/hapi/lib/types/plugin';
import { SWAGGER } from '@common/plugins/pluginConstant';
const Blipp = require('blipp') as { register: any; name: string };

export const plugins: ServerRegisterPluginObject<any>[] = [
  { plugin: Inert },
  { plugin: Vision },
  { plugin: HapiAuthBearerToken },
  { plugin: Blipp, options: { showAuth: true } },
  { plugin: HapiSwagger, options: SWAGGER },
];
