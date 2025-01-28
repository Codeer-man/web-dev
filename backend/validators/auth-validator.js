import { z } from "zod";

//creating an object schema for registration
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 charcter" })
    .max(255, { message: "Username must not be more than 355 charcter" }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(3, { message: "email must be atleast 3 charcter" })
    .max(255, { message: "email must not be more than 55 charcter" }),

  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone must be 10 character" })
    .max(10, { message: "phone must be 10 character" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(7, { message: "password must be atleast 7 character" })
    .max(15, { message: "password must noty be more than 15 character" }),
});
export default signupSchema;
