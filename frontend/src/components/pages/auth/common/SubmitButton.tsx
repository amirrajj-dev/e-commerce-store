import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isLoading: boolean;
  submitText : string;
  isSubmmitingText : string
}

const SubmitButton = ({ isSubmitting, isLoading , isSubmmitingText , submitText }: SubmitButtonProps) => {
  return (
    <motion.div>
      <motion.button
        disabled={isLoading || isSubmitting}
        type="submit"
        className="btn btn-success w-full group"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {isSubmitting || isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="loading loading-spinner loading-sm"></div>
              {isSubmmitingText}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <span>{submitText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default SubmitButton;