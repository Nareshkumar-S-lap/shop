/* eslint-disable @typescript-eslint/no-require-imports */
import { loadEnv } from '@common/loadEnv/loadEnv';
loadEnv(process.env.NODE_ENV || 'local');
import { InventoryStatus } from '@common/enum/enums';
import { logger } from '@common/logger';
import { mongoConnect } from '@common/mongo/dbConnect/mongoConnect';
import { Inventory } from '@domain/model/inventoryModel';
import { Item } from '@domain/model/productItemModel';
import { Shop } from '@domain/model/shopModel';
import seedData from '@seed/data/fullSeed.json';

const seedDatabase = async () => {
  try {
    await mongoConnect();

    // Clear existing data
    await Shop.deleteMany({});
    await Item.deleteMany({});
    await Inventory.deleteMany({});

    const shopsMap: Record<string, any> = {};
    const itemsMap: Record<string, any> = {};

    // Insert Shops (main + branches)
    for (const shop of seedData.shops) {
      let parentShopId = null;
      if (shop.parent_shop_code) {
        parentShopId = shopsMap[shop.parent_shop_code]?._id;
      }

      const createdShop = await Shop.create({
        ...shop,
        id: shop.id,
        parent_shop: parentShopId,
      });
      shopsMap[shop.code] = createdShop;
    }

    // Insert Items
    for (const item of seedData.items) {
      const createdItem = await Item.create(item);
      itemsMap[item.item_code] = createdItem;
    }

    // Insert Inventory
    for (const inv of seedData.inventory) {
      await Inventory.create({
        id: inv.id,
        shop: shopsMap[inv.shop_code]._id,
        item: itemsMap[inv.item_code]._id,
        price: inv.price,
        quantity: inv.quantity,
       reorder_level: inv.reorder_level ?? 10,
       status: Number(inv.status) as InventoryStatus,
      });
    } 

    logger.info('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
