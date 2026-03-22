"use client";

import { signIn } from "next-auth/react";

type GoogleSignInButtonProps = {
  callbackUrl?: string;
  disabled?: boolean;
};

export function GoogleSignInButton({
  callbackUrl = "/dashboard",
  disabled = false,
}: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled) {
          void signIn("google", { callbackUrl });
        }
      }}
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-200"
    >
      {disabled ? "Google nao configurado" : "Entrar com Google"}
    </button>
  );
}
