import { z } from "zod";

export const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Please enter a valid email.",
  }).email({
    message: "Invalid email address"
  }),
  country: z.string().min(2, {
    message: "Please select your country of residence..",
  }),
  street: z.string().min(2, {
    message: "Street required",
  }),
  city: z.string().min(2, {
    message: "Please input your city",
  }),
  state: z.string().min(2, {
    message: "State required",
  }),
  zip: z.string().min(2, {
    message: "Zip/Postal code required",
  }),
});
