import z from "zod";

export const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string(),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match to confirm password",
    path: ["Confirm Password"],
  });

export const loginSchame = z.object({
  email: z.email(),
  password: z.string().min(6),
  twoFactorCode: z.string().optional(),
});
