import { z } from "zod";

export function isValidInput(req, res, next) {
  const valid = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(15, { message: "Password must be at most 15 characters long" })
  });

  const isValid = valid.safeParse(req.body);

  if (isValid.success) {
    next();
  } else {
    const errors = isValid.error.errors.map((err) => err.message);
    res.status(400).json({
      message: "Invalid input",
      errors,
    });
  }
}
