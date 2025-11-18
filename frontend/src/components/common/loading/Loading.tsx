import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br brightness-160 from-success-content/90 via-base-100 to-accent-content/80">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8"
    >
      {/* Animated Logo */}
      <motion.div
        className="relative"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div className="w-24 h-24 bg-linear-to-br brightness-160 from-success-content/90 via-base-100 to-accent-content/80 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
          <ShoppingBag className="w-12 h-12 text-success-content brightness-150" />
        </div>
      </motion.div>
      {/* Loading Text and Spinner */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-success"
        >
          E-Commerce
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base-content/70 text-lg animate-pulse"
        >
          Preparing your shopping experience...
        </motion.p>
      </div>

      {/* Animated Loader */}
      <motion.div className="flex justify-center items-center space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-success rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      {/* Subtle Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-base-content/50"
      >
        This will only take a moment...
      </motion.p>
    </motion.div>
  </div>
);

export default Loading;
