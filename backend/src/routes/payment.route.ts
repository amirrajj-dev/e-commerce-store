import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import * as PaymentController from '../controllers/payment.controller';

const router = express.Router();

router.use(protectRoute);

router.post('/create-checkout-session', PaymentController.createCheckoutSession);
router.post('/checkout-success', PaymentController.checkoutSuccess);

export default router;
