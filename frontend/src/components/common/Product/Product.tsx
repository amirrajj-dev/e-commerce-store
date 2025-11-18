import { motion } from "framer-motion";
import type { ProductI } from "../../../types/interfaces/product.interface";
import { Loader2, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../../hooks/useCart";

interface ProductProps {
    product : ProductI;
    index : number;
    isAdding : boolean;
    addToCart: (productId: string, product: any) => Promise<void>
}

const Product : React.FC<ProductProps> = ({index , product, isAdding , addToCart}) => {
  const {items} = useCart()
      const userCart = items?.map(item=>item.productId) as string[]
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-base-100 rounded-xl shadow-lg overflow-hidden border border-base-300 hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`badge badge-sm ${
              product.quantity > 0 ? "badge-success" : "badge-error"
            }`}
          >
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">
            {product.category}
          </span>
          {/* Rating - You can replace with actual rating if available */}
          <div className="flex items-center gap-1">
            <Star size={14} className="text-warning fill-current" />
            <span className="text-xs text-base-content/70">4.5</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-base-content text-lg mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-base-content/70 text-sm mb-4 line-clamp-1">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-success">${product.price}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product.id, product)}
            disabled={isAdding || product.quantity === 0}
            className={`btn btn-sm gap-2 ${
              product.quantity === 0 ? "btn-disabled" : "btn-success"
            } ${userCart?.includes(product.id) && 'hidden'} `}
          >
            {isAdding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ShoppingCart size={16} />
            )}
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
