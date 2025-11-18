import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-12"
    >
      <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingCart size={40} className="text-base-content/30" />
      </div>
      <h3 className="text-2xl font-semibold text-base-content mb-4">
        Your cart is empty
      </h3>
      <p className="text-base-content/70 mb-6">
        Start shopping to add items to your cart
      </p>
      <Link to={'/'} className="btn btn-success">
        Continue Shopping
      </Link>
    </motion.div>
  );
};

export default EmptyCart;