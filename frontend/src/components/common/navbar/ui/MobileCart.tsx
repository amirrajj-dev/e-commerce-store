import { motion } from "framer-motion";
import { itemVariants } from "../variants/variants";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const MobileCart = ({ cartLength , setIsMenuOpen }: { cartLength: number; setIsMenuOpen: (value: React.SetStateAction<boolean>) => void }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between"
    >
      <span className="font-semibold">Cart Items:</span>
      <Link to={"/cart"} className="btn btn-ghost btn-sm relative" onClick={()=>setIsMenuOpen(false)}>
        <ShoppingCart className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-error text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {cartLength}
        </span>
      </Link>
    </motion.div>
  );
};

export default MobileCart;
