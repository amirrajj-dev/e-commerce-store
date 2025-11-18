import { motion } from "framer-motion";
import type { SignupFormFieldProps } from "../../types/types";
import NameField from "./NameField";
import EmailField from "../../common/EmailField";
import PasswordField from "../../common/PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";
import SubmitButton from "../../common/SubmitButton";

interface SignUpFormProps {
  register: SignupFormFieldProps["register"];
  errors: SignupFormFieldProps["errors"];
  isSubmitting: boolean;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  onSubmit: () => void;
}

const SignUpForm = ({
  register,
  errors,
  isSubmitting,
  isLoading,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  onSubmit,
}: SignUpFormProps) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="bg-base-100 p-6 md:p-8 rounded-2xl shadow-xl border border-base-300 space-y-4"
    >
      <NameField register={register} errors={errors} />
      <EmailField register={register} errors={errors} />
      <PasswordField
        register={register}
        errors={errors}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <ConfirmPasswordField
        register={register}
        errors={errors}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
      <SubmitButton submitText="Create Account" isSubmmitingText="Creating Account ..." isSubmitting={isSubmitting} isLoading={isLoading} />
    </motion.form>
  );
};

export default SignUpForm;
