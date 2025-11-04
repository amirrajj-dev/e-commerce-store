import express from 'express';
import { adminRoute, protectRoute } from '../middlewares/auth.middleware';
import * as AnalyticsController from '../controllers/analytics.controller';

const router = express.Router();

router.get('/', protectRoute, adminRoute, AnalyticsController.getAnalytics);

export default router;
