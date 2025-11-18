import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (message) {
    return (
      <motion.span
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="text-error font-bold p-1 rounded-sm shadow mt-1.5 text-sm flex items-center gap-1"
      >
        <Sparkles size={12} className="font-bold" />
        {message}
      </motion.span>
    );
  } else {
    return null;
  }
};

export default FormError;
