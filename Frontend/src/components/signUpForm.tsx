// components/signUpForm.tsx
import { useActionState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { signup } from "@/lib/auth";
import SubmitButton from "./submitButton";
import { toast } from "sonner";

export const SignUpForm = () => {
  const [state, action] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state?.success) {
      toast.success("Account created. Please log in.", {
        id: "signup-success",
      });
      navigate({ to: "/login" });
    }
  }, [state?.success, state?.message, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      action={action}
      className="w-full h-100 flex flex-col justify-center max-w-xs space-y-4 text-black"
    >
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-secondary px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary">
        <UserIcon className="h-5 w-5 text-app-secondary" />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>
      {state?.error?.name && (
        <p className="text-sm text-red-500 text-center">{state.error.name}</p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-secondary px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <MailIcon className="h-5 w-5 text-app-secondary" />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      {state?.error?.email && (
        <p className="text-sm text-red-500 text-center">{state.error.email}</p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-secondary px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary">
        <LockIcon className="h-5 w-5 text-app-secondary" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          name="password"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        <button
          aria-label="Toggle password visibility"
          type="button"
          onClick={togglePasswordVisibility}
          className="text-app-secondary hover:text-app-text"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {state?.error?.password && (
        <p className="text-sm text-red-500 text-center">
          {state.error.password}
        </p>
      )}

      <SubmitButton>Sign Up</SubmitButton>

      <div className="flex justify-center text-sm gap-1">
        <p className="text-app-secondary">Already have an account?</p>
        <a
          className="font-medium text-app-primary hover:underline"
          href="/login"
        >
          Log In
        </a>
      </div>
    </form>
  );
};
