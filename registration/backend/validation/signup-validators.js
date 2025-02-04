const z = require("zod");

const signup = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be 3 character long" })
    .max(25, { message: "username cannot have more than 25 character" }),

  email: z
    .string({ required_error: "mail is required" })
    .trim()
    .email({ message: "Email is invalid" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .max(10, { message: "Number must contain 10 digit" })
    .max(10, { message: "Number must contain 10 digit" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

module.exports = signup
