import z from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
        firstname?: string[];
        lastname?: string[];
        address?: string[];
        city?: string[];
        zipcode?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
      session?: Session;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long." })
    .regex(/[a-zA-Z]/, {
      message: " Contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: " Contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: " Contain at least one special character.",
    })
    .trim(),
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  zipcode: z
    .string()
    .min(2, { message: "Zip code must be at least 2 characters." }),
});

export interface Session {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface CommentUser {
  firstname: string;
  lastname: string;
  email: string;
  id: number;
}

export interface User {
  id: number;
  name: string;
}

export interface T_Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  description: string;
}

export interface T_Category {
  id: number;
  name: string;
  slug: string;
}

export interface T_Donations {
  theme: string;
}

export interface T_ProductDetails {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  slug: string;
  categoryId: number;
  userId: number;
}

export interface T_Comment {
  comment: string;
  id: number;
  user: CommentUser;
}
