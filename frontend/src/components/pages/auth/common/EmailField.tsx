import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { SignInFormFieldProps, SignupFormFieldProps } from "../types/types";
import FormError from "../../../shared/FormError";

const EmailField = ({ register, errors }: SignupFormFieldProps | SignInFormFieldProps) => {
    const emailRegister = (register as any).email ? 
    (register as any) : 
    register;
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
    >
      <label htmlFor="email" className="label">
        <span className="flex items-center gap-2">
          <Mail size={16} />
          Email Address
        </span>
      </label>
      <div className="relative">
        <input
          id="email"
          type="email"
          className="input input-bordered input-success w-full pl-10 focus:outline-none focus:ring-2 focus:ring-success/20 transition-all"
          placeholder="your@email.com"
          required
          {...emailRegister("email")}
        />
        <Mail className="absolute left-3 top-3 w-4 h-4 text-base-content/50 z-50" />
      </div>
      {errors.email && (
        <FormError message={errors.email.message} />
      )}
    </motion.div>
  );
};

export default EmailField;