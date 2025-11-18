import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import type { SignInPasswordFieldProps, SignUpPasswordFieldProps } from "../types/types";
import FormError from "../../../shared/FormError";

const PasswordField = ({
  register,
  errors,
  showPassword,
  setShowPassword,
}: SignInPasswordFieldProps | SignUpPasswordFieldProps) => {
   const passwordRegister = (register as any).password ? 
    (register as any) : 
    register;
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.3 }}
    >
      <label htmlFor="password" className="label">
        <span className="flex items-center gap-2">
          <Lock size={16} />
          Password
        </span>
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="input input-bordered input-success w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-success/20 transition-all"
          placeholder="Create a strong password"
          required
          {...passwordRegister("password")}
        />
        <Lock className="absolute left-3 top-3 w-4 h-4 text-base-content/50 z-50" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 btn btn-ghost btn-xs"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {errors.password && (
        <FormError message={errors.password.message} />
      )}
    </motion.div>
  );
};

export default PasswordField;