import { routeBuilder } from '@common/route/mainRoute';
import { healthCheck } from '@modules/health/healthService';

const healthTag = ['HEALTH'];

const HealthRoute = routeBuilder([
  {
    method: 'get',
    path: '/health',
    businessLogic: async () => {
      return healthCheck();
    },
    config: {
      tags: healthTag,
      description: 'health check',
    },
  },
]);

export default HealthRoute;
