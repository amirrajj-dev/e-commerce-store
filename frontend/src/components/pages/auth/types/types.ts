import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SignUpType } from "../../../../validations/auth/signup.validation";
import type { SignInType } from "../../../../validations/auth/signin.validation";

export interface SignupFormFieldProps {
  register: UseFormRegister<SignUpType>;
  errors: FieldErrors<SignUpType>;
}

export interface SignInFormFieldProps {
  register: UseFormRegister<SignInType>;
  errors: FieldErrors<SignInType>;
}

export interface SignUpPasswordFieldProps extends SignupFormFieldProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export interface SignInPasswordFieldProps extends SignInFormFieldProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export interface ConfirmPasswordFieldProps extends SignupFormFieldProps {
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}
