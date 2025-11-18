import { motion } from "framer-motion";
import { User } from "lucide-react";
import type{ SignupFormFieldProps } from "../../types/types";
import FormError from "../../../../shared/FormError";

const NameField = ({ register, errors }: SignupFormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.7 }}
    >
      <label htmlFor="name" className="label">
        <span className="flex items-center gap-2">
          <User size={16} />
          Full Name
        </span>
      </label>
      <div className="relative">
        <input
          id="name"
          type="text"
          className="input input-bordered input-success w-full pl-10 focus:outline-none focus:ring-2 focus:ring-success/20 transition-all"
          placeholder="Enter your full name"
          required
          {...register("name")}
        />
        <User className="absolute left-3 top-3 w-4 h-4 text-base-content/50 z-50" />
      </div>
      {errors.name && (
        <FormError message={errors.name.message} />
      )}
    </motion.div>
  );
};

export default NameField;