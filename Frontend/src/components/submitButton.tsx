import { useFormStatus } from "react-dom";

import type { ReactNode } from "react";

const SubmitButton = ({
  disabled,
  children,
}: {
  disabled?: boolean;
  children: ReactNode;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="submit form"
      disabled={pending || disabled}
      className="w-full bg-app-primary text-app-background py-2 rounded-2xl hover:cursor-pointer"
    >
      {pending ? "Submitting..." : children}
    </button>
  );
};

export default SubmitButton;
