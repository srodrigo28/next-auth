"use client";

import { signOut, useSession } from "next-auth/react";

export function DashboardActions() {
  const { update } = useSession();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => update()}
        className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
      >
        Atualizar perfil
      </button>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
      >
        Sair
      </button>
    </div>
  );
}
