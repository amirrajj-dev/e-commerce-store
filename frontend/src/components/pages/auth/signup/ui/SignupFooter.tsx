import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SignUpFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3.2 }}
      className="text-center mt-6 p-4 bg-base-100 rounded-xl shadow border border-base-300"
    >
      <p className="text-base-content">
        Already have an account?{" "}
        <Link
          to={"/signin"}
          className="link no-underline link-success font-bold hover:link-hover transition-colors inline-flex items-center gap-1"
        >
          Sign in here
          <ArrowRight className="w-4 h-4" />
        </Link>
      </p>
    </motion.div>
  );
};

export default SignUpFooter;