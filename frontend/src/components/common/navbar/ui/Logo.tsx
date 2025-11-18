import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={"/"} className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-success hover:text-success/80 transition-colors">
          E-Commerce
        </span>
      </Link>
    </motion.div>
  );
};

export default Logo;
