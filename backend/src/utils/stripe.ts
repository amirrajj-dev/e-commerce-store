import Stripe from 'stripe';
import { ENV } from '../configs/env';
export const stripe = new Stripe(ENV.STRIPE_SECRET_KEY!);
