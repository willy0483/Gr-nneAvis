import { BACKEND_URL } from "./constants";
import { LoginFormSchema, SignupFormSchema, type FormState } from "./types";

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
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        name: fieldErrors.name,
        email: fieldErrors.email,
        password: fieldErrors.password,
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
      image: "1",
      isActive: 1,
      description: "test",
      refreshToken: "refreshToken",
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return {
      message:
        response.status === 409
          ? "The user already existed!"
          : response.statusText,
    };
  }
};
