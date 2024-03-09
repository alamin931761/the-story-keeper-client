import { z } from "zod";

// contact schema
export const ContactSchema = z.object({
  user_name: z
    .string()
    .trim()
    .min(1, { message: "Name field is required" })
    .regex(/^[A-Za-z\s\-\.]+$/, "Name must contain only letters"),

  user_email: z
    .string()
    .min(1, { message: "Email field is required" })
    .email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message field is required" }).trim(),
});

// add book book schema
export const AddBookSchema = z.object({
  imageURL: z
    .string()
    .trim()
    .min(1, { message: "Image URL field is required" }),

  title: z
    .string()
    .min(1, { message: "Title field is required" })
    .regex(
      /^[()A-Za-z\s\-,\.\"':0-9&]+$/,
      `Title must contain only letters, numbers, spaces, and the characters (,-'.()"&:)`
    )
    .trim(),

  subtitle: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => {
        if (value) {
          return /^[()A-Za-z\s\-,\.\"':0-9&]+$/.test(value);
        }
        return true;
      },
      {
        message: `Title must contain only letters, numbers, spaces, and the characters (,-'.()"&:)`,
      }
    ),

  author: z
    .string()
    .trim()
    .min(1, { message: "Author field is required" })
    .regex(/^[A-Za-z\s\-,\.]+$/, "Author must contain only letters"),

  price: z
    .string()
    .min(1, { message: "Price field is required" })
    .regex(/^(?:[1-9]\d*|0)(?:\.\d+)?$/, {
      message: "Price must be a positive number",
    }),

  availableQuantity: z
    .string()
    .min(1, { message: "Quantity field is required" })
    .regex(/^(?:[1-9]\d*|0)$/, "Quantity must be a positive integer number"),

  description: z.string().trim().optional(),

  publisher: z
    .string()
    .trim()
    .min(1, { message: "Publisher field is required" })
    .regex(/^[A-Za-z\s\-,\.&]+$/, "Publisher must contain only letters"),
  publicationDate: z
    .string()
    .min(1, { message: "Publication date field is required" }),

  weight: z
    .string()
    .min(1, { message: "Weight field is required" })
    .regex(/^(?:[1-9]\d*|0)$/, "Weight must be a positive integer number"),

  pagesQuantity: z
    .string()
    .min(1, { message: "Pages quantity field is required" })
    .regex(
      /^(?:[1-9]\d*|0)$/,
      "Pages quantity must be a positive integer number"
    ),

  dimensions: z.string().min(1, { message: "Dimensions field is required" }),

  isbn: z
    .string()
    .min(1, { message: "ISBN field is required" })
    .regex(/^(?:[1-9]\d*|0)$/, "ISBN must be a positive integer number"),

  binding: z
    .string()
    .min(1, { message: "Binding field is required" })
    .regex(/^[A-Za-z\s\-,\.]+$/, "Binding must contain only letters"),

  category: z.string().min(1, { message: "Category field is required" }),
});

export const UpdateBookSchema = z.object({
  price: z
    .string()
    .min(1, { message: "Price field is required" })
    .regex(/^(?:[1-9]\d*|0)(?:\.\d+)?$/, {
      message: "Price must be a positive number",
    }),

  availableQuantity: z
    .string()
    .min(1, { message: "Available quantity field is required" })
    .regex(
      /^(?:[1-9]\d*|0)$/,
      "Available quantity must be a positive integer number"
    ),
});

// update password schema
export const UpdatePasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm new password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),
});

// update profile schema
export const updateProfileSchema = z.object({
  imageURL: z.string().trim().optional(),
  phoneNumber: z
    .string()
    .refine(
      (value) => {
        if (value) {
          return /^[0-9]+$/.test(value);
        }
        return true;
      },
      { message: "Invalid phone number" }
    )
    .optional(),
  address: z.string().trim().optional(),
});

// sign in schema
export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),
});

// reset password schema
export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field is required" })
    .email({ message: "Invalid email address" }),
});

// sign up schema
export const SignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name field is required" })
    .regex(/^[A-Za-z\s\-\.]+$/, "Name must contain only letters"),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(1, { message: "Password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),
});

// delivery details schema
export const deliveryDetailsSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number field is required" })
    .regex(
      /^0\d{10}$/,
      "Invalid phone number, please enter 11 digit phone number"
    ),
  deliveryAddress: z
    .string()
    .trim()
    .min(1, { message: "Delivery address field is required" }),
});

// add review schema
export const addReviewSchema = z.object({
  review: z
    .string()
    .min(1, { message: "Review content field is required" })
    .trim(),
});
