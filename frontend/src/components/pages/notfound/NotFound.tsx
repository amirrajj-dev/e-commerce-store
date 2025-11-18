import { TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 gap-6 bg-base-100 rounded-2xl shadow-xl border border-base-300 w-full max-w-md"
      >
        {/* Icon with bounce animation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="bg-success/20 text-success p-4 rounded-full"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3 
            }}
          >
            <TriangleAlert size={64} />
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h1 className="text-success text-8xl font-bold mb-2">404</h1>
          <p className="text-base-content text-2xl font-semibold mb-2">
            Page Not Found
          </p>
          <p className="text-base-content/70 text-lg">
            The page you're looking for doesn't exist.
          </p>
        </motion.div>

        {/* Back to Home button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full mt-4"
        >
          <Link to="/" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-success btn-lg w-full gap-2"
            >
              Back to Homepage
            </motion.button>
          </Link>
        </motion.div>

        {/* Go Back button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="btn btn-success btn-soft w-full"
          >
            Go Back
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;