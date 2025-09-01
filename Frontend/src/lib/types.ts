import z from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
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
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .trim(),
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
  image: string;
}

export interface User {
  id: number;
  name: string;
}

export interface T_Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  procedure: string;
  durationInMinutes: number;
  amount: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  favorites: T_Favorite[];
  numFavorites: number;
}

export interface T_Favorite {
  userId: number;
}

export interface T_ProductDetails {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  procedure: string;
  durationInMinutes: number;
  amount: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productIngredients: ProductIngredient[];
}
export interface ProductIngredient {
  id: number;
  productId: number;
  ingredientId: number;
  unitId: number;
  amount: number;
  orderNum: number;
  ingredients: Ingredients;
  units: Units;
}
export interface Ingredients {
  title: string;
}

export interface Units {
  name: string;
  abbreviation: string;
}
