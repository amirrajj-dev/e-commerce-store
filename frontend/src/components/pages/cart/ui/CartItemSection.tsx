import { motion, AnimatePresence } from 'framer-motion';
import type{ CartItemsSectionProps } from '../types/types';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

const CartItemsSection: React.FC<CartItemsSectionProps> = ({
  items,
  totalItems,
  isAdding,
  isRemoving,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  return (
    <div className="lg:col-span-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-base-100 rounded-2xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-base-content">
            Cart Items ({totalItems})
          </h2>
          <div className="badge badge-success badge-lg">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </div>
        </div>

        <AnimatePresence>
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  isAdding={isAdding}
                  isRemoving={isRemoving}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CartItemsSection;