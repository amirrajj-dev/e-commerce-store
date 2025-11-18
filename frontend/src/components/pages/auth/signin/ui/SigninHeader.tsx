import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

const SigninHeader = () => {
  return (
    <motion.div className="text-center mb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <LogIn className="w-8 h-8 text-white" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-success mb-2"
      >
        Welcome Back
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        className="text-base-content/70"
      >
        Sign in to your account and continue shopping
      </motion.p>
    </motion.div>
  );
};

export default SigninHeader;
