import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "min 3"),
  email: z.string().email("valid email is requierd"),
  password: z.string().min(6, "min 6 words"),
});

export const loginSchema = z.object({
  email: z.string().email("valid email is requierd"),
  password: z.string().min(6, "min 6 words"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
