import express from 'express';
import * as CartControllr from '../controllers/cart.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protectRoute);

router.get('/', CartControllr.getCartProducts);
router.post('/', CartControllr.addProductToCart);
router.delete('/', CartControllr.removeProductFromCart);
router.delete('/clear', CartControllr.clearCart);
router.put('/:id', CartControllr.updateProductQuantity);

export default router;
