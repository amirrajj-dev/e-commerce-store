import prisma from '../utils/prisma';

export async function createNewCoupon(userId: string) {
  await prisma.coupon.delete({
    where: {
      userId,
    },
  });

  const newCoupon = await prisma.coupon.create({
    data: {
      code: 'GIFT' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      discountPercentage: 10,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      userId,
    },
  });

  return newCoupon;
}
