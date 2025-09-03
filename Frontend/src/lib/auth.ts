import { BACKEND_URL } from "./constants";
import {
  AnnonceFormSchema,
  LoginFormSchema,
  SignupFormSchema,
  type AnnonceFormState,
  type FormState,
} from "./types";

export const login = async (
  _state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
    };
  }

  const data = {
    username: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    return { success: true, session: result };
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }
};

export const signup = async (
  _state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    address: formData.get("address"),
    city: formData.get("city"),
    zipcode: formData.get("zipcode"),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        email: fieldErrors.email,
        password: fieldErrors.password,
        firstname: fieldErrors.firstname,
        lastname: fieldErrors.lastname,
        address: fieldErrors.address,
        city: fieldErrors.city,
        zipcode: fieldErrors.zipcode,
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...validatedFields.data,
      isActive: 1,
      hasNewsletter: true,
      hasNotification: true,
      refreshToken: "refreshToken",
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return {
      message:
        response.status === 500
          ? "The user already existed!"
          : response.statusText,
    };
  }
};

export const annonce = async (
  _state: AnnonceFormState,
  formData: FormData,
  accessToken?: string
) => {
  const validatedFields = AnnonceFormSchema.safeParse({
    title: formData.get("title"),
    category: Number(formData.get("category")),
    text: formData.get("text"),
    url: formData.get("url"),
    price: Number(formData.get("price")),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        title: fieldErrors.title,
        category: fieldErrors.category,
        text: fieldErrors.text,
        url: fieldErrors.url,
        price: fieldErrors.price,
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: validatedFields.data.title,
      image: validatedFields.data.url,
      description: validatedFields.data.text,
      price: validatedFields.data.price,
      categoryId: validatedFields.data.category,
    }),
  });

  console.log(response);

  if (response.ok) {
    return { success: true };
  } else {
    return {
      message: response.statusText,
    };
  }
};
