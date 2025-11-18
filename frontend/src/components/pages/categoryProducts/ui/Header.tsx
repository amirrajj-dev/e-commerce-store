import { motion } from "framer-motion";

const Header = ({ category }: { category: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-success font-bold mb-4 capitalize">
        {category}
      </h1>
      <p className="text-base-content/70 text-lg">
        Discover our amazing collection of {category} products
      </p>
    </motion.div>
  );
};

export default Header;
