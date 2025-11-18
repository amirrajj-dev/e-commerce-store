import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { redis } from '../utils/redis';

export const updateFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
    });
    await redis.set(
      'featured_products',
      JSON.stringify(featuredProducts),
      'EX',
      // 12 hours
      43200,
    );
  } catch (error) {
    logger.error(
      `error in update featured products cache => ${error instanceof Error ? error.message : error}`,
    );
  }
};
