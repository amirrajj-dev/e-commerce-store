import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const DesktopCart = ({ cartLength }: { cartLength: number }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link to={"/cart"} className="btn btn-ghost btn-circle relative">
        <ShoppingCart className="w-5 h-5" />
        {cartLength > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
            {cartLength}
          </span>
        )}
      </Link>
    </motion.div>
  );
};

export default DesktopCart;
