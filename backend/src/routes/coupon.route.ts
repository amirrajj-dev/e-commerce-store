import express from 'express';
import * as CouponController from '../controllers/coupon.controller';
import { adminRoute, protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protectRoute);

router.get('/', CouponController.getCoupon);
router.post('/validate', CouponController.validateCoupon);
router.post('/', protectRoute, adminRoute, CouponController.createCoupon);

export default router;
