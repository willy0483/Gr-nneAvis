// components/signUpForm.tsx
import { useActionState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { signup } from "@/lib/auth";
import SubmitButton from "./submitButton";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";

export const SignUpForm = () => {
  const [state, action] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success("Account created. Please log in.", {
        id: "signup-success",
      });
      navigate({ to: "/login" });
    }
  }, [state, state?.success, state?.message, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      action={action}
      className="w-full mt-15 flex flex-col justify-center max-w-xs space-y-4 text-black"
    >
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <MailIcon className="h-5 w-5 text-gray-600" />
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

      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <LockIcon className="h-5 w-5 text-gray-600" />
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
          className="text-gray-600 hover:text-app-text"
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

      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="First Name"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      {state?.error?.firstname && (
        <p className="text-sm text-red-500 text-center">
          {state.error.firstname}
        </p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last Name"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      {state?.error?.lastname && (
        <p className="text-sm text-red-500 text-center">
          {state.error.lastname}
        </p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      {state?.error?.address && (
        <p className="text-sm text-red-500 text-center">
          {state.error.address}
        </p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      {state?.error?.city && (
        <p className="text-sm text-red-500 text-center">{state.error.city}</p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="Zip Code"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={zipcode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
      </div>

      {state?.error?.zipcode && (
        <p className="text-sm text-red-500 text-center">
          {state.error.zipcode}
        </p>
      )}

      <div className=" flex items-center gap-5">
        <Checkbox
          className=""
          id="terms"
          checked={agree}
          onCheckedChange={(checked) => {
            setAgree(!!checked);
          }}
        />
        <label htmlFor="terms" className=" text-[12px]">
          Jeg har læst og forstået de gældende betingelser for oprettelse af
          kundekonto og brug af denne side
        </label>
      </div>

      <SubmitButton disabled={!agree}>Sign Up</SubmitButton>

      <div className="flex justify-center text-sm gap-1">
        <p className="text-gray-600">Har du allerede en konto? </p>
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
