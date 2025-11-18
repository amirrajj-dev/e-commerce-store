import { motion } from "framer-motion";

const CreateProductHeader = () => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl text-success font-bold mb-8"
    >
      Create New Product
    </motion.h2>
  );
};

export default CreateProductHeader;