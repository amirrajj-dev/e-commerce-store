import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { protectRoute } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rate-limitter.middleware';
import { ENV } from '../configs/env';

const router = express.Router();

router.post('/signup', AuthController.signup);

if (ENV.NODE_ENV === 'development') {
  router.post('/signin', AuthController.signin);
} else {
  router.post('/signin', authLimiter, AuthController.signin);
}

router.post('/logout', AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/profile', protectRoute, AuthController.getMe);

export default router;
