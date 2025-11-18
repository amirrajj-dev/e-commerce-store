import { motion } from 'framer-motion';

const CartHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl font-bold text-success mb-4">Shopping Cart</h1>
      <p className="text-base-content/70 text-lg">
        Review your items and proceed to checkout
      </p>
    </motion.div>
  );
};

export default CartHeader;