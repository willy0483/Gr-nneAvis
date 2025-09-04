import { profile as profilebase } from "@/lib/auth";
import type { ProfileFormState } from "@/lib/types";
import { useAuth } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";
import SubmitButton from "./submitButton";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const ProfileForm = () => {
  const { loginData, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const profile = async (
    state: ProfileFormState,
    formData: FormData
  ): Promise<ProfileFormState> =>
    await profilebase(state, formData, loginData?.user.id || 0);

  const [state, action] = useActionState(profile, undefined);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(`User opdateret!`, {
        id: "profile-success",
      });
    }
  }, [state?.success]);

  const handleDelete = async (id: number) => {
    await api.delete(`users/${id}`, undefined);
    toast.success("userDelete", {
      id: "user-delete",
    });
    logout();
  };

  return (
    <form
      action={action}
      className="w-full my-15 flex flex-col justify-center max-w-3xl mx-auto space-y-4 text-black xl:flex-row xl:justify-between gap-10"
    >
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <div className="flex flex-col gap-4 w-full m-0">
        <label htmlFor="firstname" className="text-xs mb-1">
          Fornavn
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Dit navn..."
          className="border border-app-primary/50 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50 outline-none"
        />

        {state?.error?.firstname && (
          <p className="text-sm text-red-500 text-center">
            {state.error.firstname}
          </p>
        )}

        <label htmlFor="lastname" className="text-xs mb-1">
          Efternavn
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Dit efternavn..."
          className="border border-app-primary/50 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50 outline-none"
        />

        {state?.error?.lastname && (
          <p className="text-sm text-red-500 text-center">
            {state.error.lastname}
          </p>
        )}

        <label htmlFor="lastname" className="text-xs mb-1">
          Password
        </label>
        <div className="relative flex items-center gap-2 rounded-md border border-app-primary/50 px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50">
          <LockIcon className="h-5 w-5 text-gray-600" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            name="password"
            className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
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

        <label htmlFor="address" className="text-xs mb-1">
          Adresse
        </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Din adresse..."
          className="border border-app-primary/50 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50 outline-none"
        />
        {state?.error?.address && (
          <p className="text-sm text-red-500 text-center">
            {state.error.address}
          </p>
        )}

        <label htmlFor="city" className="text-xs mb-1">
          By
        </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Din by..."
          className="border border-app-primary/50 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50 outline-none"
        />

        {state?.error?.city && (
          <p className="text-sm text-red-500 text-center">{state.error.city}</p>
        )}

        <label htmlFor="zipcode" className="text-xs mb-1">
          Postnummer
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="Dit postnummer..."
          className="border border-app-primary/50 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50 outline-none"
        />

        {state?.error?.zipcode && (
          <p className="text-sm text-red-500 text-center">
            {state.error.zipcode}
          </p>
        )}

        <label htmlFor="email" className="text-xs mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Din email adresse..."
          autoComplete="username"
          className="border border-app-primary/50 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary/50 outline-none"
        />

        {state?.error?.email && (
          <p className="text-sm text-red-500 text-center">
            {state.error.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 justify-between min-h-full ">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasNewsletter"
            name="hasNewsletter"
            className="accent-app-primary"
          />
          <label htmlFor="hasNewsletter" className="text-xs">
            Jeg ønsker at modtage nyheder om klima-indsatser, gode tilbud,
            eksklusive deals og lignende prosomterings-mails fra den grønne avis
            og samarbejdspartnere?
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasNotification"
            name="hasNotification"
            className="accent-app-primary"
          />
          <label htmlFor="hasNotification" className="text-xs">
            Jeg ønsker at modtage notifikationer i form af email når der sker en
            opdatering på en af mine annoncer eller jeg modtager en henvendelse?
          </label>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <button
            type="button"
            className="bg-app-danger bg-red-500 text-white py-2 rounded-2xl hover:cursor-pointer"
            onClick={() => {
              if (loginData?.user.id) {
                handleDelete(loginData.user.id);
              }
            }}
          >
            slet profil
          </button>

          <SubmitButton>gem ændringer</SubmitButton>
        </div>
      </div>
    </form>
  );
};
export default ProfileForm;
