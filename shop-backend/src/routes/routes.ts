import { assembleRoutes } from '@common/route/assembleRoutes';
import HealthRoute from '@modules/health/healthRoute';

const routes = assembleRoutes(HealthRoute);

export default routes;
