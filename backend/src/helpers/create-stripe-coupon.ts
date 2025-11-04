import { stripe } from '../utils/stripe';

export async function createStripeCoupon(discountPercentage: number) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: 'once',
  });

  return coupon.id;
}
