import { routeBuilder } from '@common/route/mainRoute';
import { shopDetails, shopList } from '@modules/shop/shopService';

const shopTag = ['SHOP'];

const ShopRoute = routeBuilder([
  {
    method: 'get',
    path: '/shop',
    businessLogic: async (request) => {
      const shopName = request.getQueryParam('name');
      const shopAddress = request.getQueryParam('address');
      return shopList(shopName, shopAddress);
    },
    config: {
      tags: shopTag,
      description: 'health check',
    },
  },
  {
    method: 'get',
    path: '/shop/{id}',
    businessLogic: async (request) => {
      const id = request.getParam('id');
      return shopDetails(id);
    },
    config: {
      tags: shopTag,
      description: 'health check',
    },
  },
]);

export default ShopRoute;
