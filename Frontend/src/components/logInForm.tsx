import { useActionState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/utils";
import { login } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import SubmitButton from "./submitButton";

export const LoginForm = () => {
  const [state, action] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { createSession } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state?.success && state.session) {
      createSession(state.session);
      console.log(state.session);

      toast.success(`Welcome back, ${state.session.user.name}!`, {
        id: "login-success",
      });
      navigate({ to: "/" });
    }
  }, [state?.success, navigate, state?.session, createSession]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      action={action}
      className="w-full h-100 flex flex-col justify-center max-w-xs space-y-4 text-black"
    >
      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <MailIcon className="h-5 w-5 text-gray-600" />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="flex-1 border-none outline-0 border-0 bg-transparent focus:ring-0 p-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      {state?.error?.email && (
        <p className="text-sm text-red-500 text-center">{state.error.email}</p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border  border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <LockIcon className="h-5 w-5 text-gray-600" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          name="password"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          aria-label="Toggle password visibility"
          onClick={togglePasswordVisibility}
          className="text-gray-600 hover:text-app-text"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>

        {state?.error?.password && (
          <p className="text-sm text-red-500 text-center">
            {state.error.password}
          </p>
        )}
      </div>

      <SubmitButton>Login In</SubmitButton>

      <div className="flex justify-center text-sm gap-1">
        <p className="text-gray-600">Har du ikke allerede en konto?</p>
        <a
          className="font-medium text-app-primary hover:underline"
          href="/signup"
        >
          Sign Up
        </a>
      </div>
    </form>
  );
};
