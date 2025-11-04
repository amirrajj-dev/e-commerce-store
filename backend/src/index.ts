import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morganMiddleware from './utils/morgan';
import logger from './utils/logger';
import { ENV } from './configs/env';
import { apiLimiter } from './middlewares/rate-limitter.middleware.js';
import cors from 'cors';

const app = express();
const port = ENV.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morganMiddleware);
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(
  cors({
    origin: ENV.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
);

// Health Check Route
app.get('/health', (_req, res) => {
  logger.info('health check');
  res.json({ message: 'OK', success: true });
});

// Start Server Function
const startServer = async () => {
  try {
    const { default: authRoutes } = await import('./routes/auth.route.js');
    const { default: productRoutes } = await import('./routes/product.route.js');
    const { default: cartRoutes } = await import('./routes/cart.route.js');
    const { default: couponRoutes } = await import('./routes/coupon.route.js');
    const { default: paymentRoutes } = await import('./routes/payment.route.js');
    const { default: analyticsRoutes } = await import('./routes/analytics.route.js');
    app.use('/api', apiLimiter);
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/coupons', couponRoutes);
    app.use('/api/payments', paymentRoutes);
    app.use('/api/analytics', analyticsRoutes);

    app.listen(port, () => {
      console.log(`Server running on port ${port} 🛍️`);
    });
  } catch (error) {
    console.log('❌ Internal server error => ', error instanceof Error ? error.message : error);
  }
};

startServer();
