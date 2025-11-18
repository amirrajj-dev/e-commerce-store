import prisma from '../utils/prisma';

const getCouponPercent = (amount: number) => {
  if (amount >= 200 && amount < 300) return 10;
  if (amount >= 300 && amount < 400) return 20;
  if (amount >= 400 && amount < 500) return 30;
  if (amount >= 500 && amount < 600) return 40;
  if (amount >= 600 && amount < 700) return 50;
  if (amount >= 700) return 60;
  return 0;
};
export async function createNewCoupon(userId: string, totalAmount: number) {
  await prisma.coupon.deleteMany({
    where: {
      userId,
    },
  });

  const newCoupon = await prisma.coupon.create({
    data: {
      code: 'GIFT' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      discountPercentage: getCouponPercent(totalAmount),
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      userId,
    },
  });

  return newCoupon;
}
