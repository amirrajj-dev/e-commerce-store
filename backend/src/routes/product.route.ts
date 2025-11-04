import express from 'express';
import * as ProductController from '../controllers/product.controller';
import { adminRoute, protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', protectRoute, adminRoute, ProductController.getAllProducts);
router.get('/featured', ProductController.getFeaturedProducts);
router.get('/recommendations', ProductController.getRecommendedProducts);
router.get('/category/:category', ProductController.getProductsByCategory);
router.use(protectRoute, adminRoute);
router.post('/', ProductController.createProduct);
router.patch('/:id', ProductController.toggleFeaturedStatus);
router.delete('/:id', ProductController.deleteProduct);
router.put('/:id', ProductController.updateProduct);

export default router;
