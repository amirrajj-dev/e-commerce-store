import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm, type UseFormRegister } from "react-hook-form";
import {
  schema,
  type SignUpType,
} from "../../../../validations/auth/signup.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../../stores/hook";
import { signup } from "../../../../stores/reducers/user/user.thunks";
import { toast } from "sonner";
import SignUpHeader from "./ui/SignupHeader";
import SignUpForm from "./ui/SignupForm";
import SignUpFooter from "./ui/SignupFooter";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  const onSubmit = async (data: SignUpType) => {
    try {
      const {type , payload} = await dispatch(signup(data));
     if (type === "user/signup/fulfilled") {
       toast.success("signed up succesfully");
      setTimeout(() => {
        navigate("/");
      }, 3000);
     }else {
      throw new Error(payload as string)
     }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "something goes wrong try again later"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <SignUpHeader />
        <SignUpForm
          errors={errors}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
          register={register as UseFormRegister<SignUpType>}
          setShowConfirmPassword={setShowConfirmPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          showPassword={showPassword}
        />
        <SignUpFooter />
      </motion.div>
    </div>
  );
};

export default SignUp;
