import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import type{ FormFieldProps } from "../types/types";

const SubmitButton = ({ isSubmitting, isCreating }: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <motion.button
        type="submit"
        disabled={isSubmitting || isCreating}
        className="btn btn-success w-full group disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <div className="loading loading-spinner"></div>
        ) : (
          <PlusCircle size={18} />
        )}
        <span>
          {isSubmitting ? "Creating Product..." : "Create Product"}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default SubmitButton;