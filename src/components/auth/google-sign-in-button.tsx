"use client";

import { signIn } from "next-auth/react";

type GoogleSignInButtonProps = {
  callbackUrl?: string;
};

export function GoogleSignInButton({
  callbackUrl = "/dashboard",
}: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl })}
      className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
    >
      Entrar com Google
    </button>
  );
}
