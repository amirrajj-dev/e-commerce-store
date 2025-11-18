import z from "zod";
import { passwordReg } from "../../helpers/regex";

export const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(passwordReg, {
      message:
        "Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum of 6 characters",
    }),
});

export type SignInType = z.infer<typeof schema>;
