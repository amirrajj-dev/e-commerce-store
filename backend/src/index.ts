import 'dotenv/config';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morganMiddleware from './utils/morgan';
import logger from './utils/logger';
import { ENV } from './configs/env';
import { apiLimiter } from './middlewares/rate-limitter.middleware.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import cron from 'node-cron';
import fs from 'fs';

const app = express();
const port = ENV.PORT || 5000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morganMiddleware);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  }),
);
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

if (ENV.NODE_ENV !== 'development') {
  app.use('/api', apiLimiter);
}

// Health Check Route
app.get('/health', (_req, res) => {
  logger.info('health check');
  res.json({ message: 'OK', success: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const tmpDir = path.join(__dirname, 'temp');
// Delete files in tmpDir every day
cron.schedule('0 * * * *', () => {
  fs.readdir(tmpDir, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      fs.unlink(path.join(tmpDir, file), (err) => {
        if (err) {
          throw err;
        }
        logger.info('temp files deleted succesfully');
      });
    });
  });
});

// Start Server Function
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port} 🛍️`);
    });
  } catch (error) {
    console.log('❌ Internal server error => ', error instanceof Error ? error.message : error);
  }
};

startServer();
