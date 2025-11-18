import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import type { ConfirmPasswordFieldProps } from "../../types/types";
import FormError from "../../../../shared/FormError";

const ConfirmPasswordField = ({
  register,
  errors,
  showConfirmPassword,
  setShowConfirmPassword,
}: ConfirmPasswordFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.6 }}
    >
      <label htmlFor="confirmPassword" className="label">
        <span className="flex items-center gap-2">
          <Lock size={16} />
          Confirm Password
        </span>
      </label>
      <div className="relative">
        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          className="input input-bordered input-success w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-success/20 transition-all"
          placeholder="Confirm your password"
          required
          {...register("confirmPassword")}
        />
        <Lock className="absolute left-3 top-3 w-4 h-4 text-base-content/50 z-50" />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-2 btn btn-ghost btn-xs"
        >
          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {errors.confirmPassword && (
        <FormError message={errors.confirmPassword.message} />
      )}
    </motion.div>
  );
};

export default ConfirmPasswordField;
