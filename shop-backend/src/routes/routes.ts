import { assembleRoutes } from '@common/route/assembleRoutes';
import HealthRoute from '@modules/health/healthRoute';
import ShopRoute from '@modules/shop/shopRoute';
const routes = assembleRoutes(HealthRoute, ShopRoute);

export default routes;
