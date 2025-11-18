import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import type{ CartItemProps } from '../types/types';

const CartItem: React.FC<CartItemProps> = ({
  item,
  index,
  isAdding,
  isRemoving,
  onQuantityChange,
  onRemoveItem,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 p-4 bg-base-200 relative rounded-xl hover:bg-base-300 transition-colors"
    >
      {/* Product Image */}
      <div className="shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="grow">
        <h3 className="font-semibold text-base-content text-lg">
          {item.product.name}
        </h3>
        <p className="text-success font-bold text-lg">
          ${item.product.price}
        </p>
        <p className="text-sm text-base-content/70">
          Stock: {item.product.quantity}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
          disabled={item.quantity <= 1 || isAdding}
          className="btn btn-circle btn-sm btn-outline"
        >
          <Minus size={16} />
        </button>
        
        <span className="font-semibold text-base-content min-w-8 text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
          disabled={item.quantity >= item.product.quantity || isAdding}
          className="btn btn-circle btn-sm btn-outline"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Total Price & Remove */}
      <div className="text-right">
        <p className="font-bold text-base-content text-lg  absolute top-2 right-2 sm:static">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemoveItem(item.productId)}
          disabled={isRemoving}
          className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content mt-2  absolute bottom-2 right-2 sm:static"
        >
          {isRemoving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;