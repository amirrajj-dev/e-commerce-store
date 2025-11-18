import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  schema,
  type SignInType,
} from "../../../../validations/auth/signin.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../../stores/hook";
import { toast } from "sonner";
import { signin } from "../../../../stores/reducers/user/user.thunks";
import SigninFooter from "./ui/SigninFooter";
import SigninForm from "./ui/SigninForm";
import SigninHeader from "./ui/SigninHeader";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  const onSubmit = async (data: SignInType) => {
    try {
      const { type, payload } = await dispatch(signin(data));
      if (type === "user/signin/fulfilled") {
        toast.success("signed in succesfully");
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
        <SigninHeader />
        <SigninForm
          showPassword={showPassword}
          register={register}
          setShowPassword={setShowPassword}
          errors={errors}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
        />
        <SigninFooter />
      </motion.div>
    </div>
  );
};

export default SignIn;
