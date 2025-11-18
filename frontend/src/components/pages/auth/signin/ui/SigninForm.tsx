import { motion } from "framer-motion";
import EmailField from "../../common/EmailField";
import PasswordField from "../../common/PasswordField";
import SubmitButton from "../../common/SubmitButton";
import type { SignInFormFieldProps } from "../../types/types";

interface SignInFormProps {
  register: SignInFormFieldProps["register"];
  errors: SignInFormFieldProps["errors"];
  isSubmitting: boolean;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  onSubmit: () => void;
}

const SigninForm: React.FC<SignInFormProps> = ({
  isLoading,
  isSubmitting,
  onSubmit,
  errors,
  register,
  showPassword,
  setShowPassword,
}) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="bg-base-100 p-6 md:p-8 rounded-2xl shadow-xl border border-base-300 space-y-6"
    >
      <EmailField errors={errors} register={register} />
      <PasswordField
        errors={errors}
        register={register}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <SubmitButton
        isSubmitting={isSubmitting}
        isLoading={isLoading}
        isSubmmitingText="Signing In ..."
        submitText="SiginIn"
      />
    </motion.form>
  );
};

export default SigninForm;
