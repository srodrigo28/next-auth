import { redirect } from "next/navigation";
import { getAuthSession, isAuthConfigured } from "@/auth";
import { DashboardActions } from "@/components/auth/dashboard-actions";

export default async function DashboardPage() {
  if (!isAuthConfigured) {
    redirect("/login");
  }

  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-1 px-6 py-16">
      <section className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:grid-cols-[1fr_auto] md:p-12">
        <div className="space-y-6">
          <div>
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Dashboard
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white">
              Area autenticada
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-300">
              Esta e a primeira area privada do sistema. Aqui mostramos os dados basicos
              da sessao vinda do Google.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Nome</p>
              <p className="mt-2 text-sm font-semibold text-white">{session.user.name}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Email</p>
              <p className="mt-2 text-sm font-semibold text-white">{session.user.email}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Status</p>
              <p className="mt-2 text-sm font-semibold text-white">Autenticado</p>
            </div>
          </div>

          <DashboardActions />
        </div>

        <aside className="flex items-start justify-center">
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name ?? "Avatar do usuario"}
              className="h-28 w-28 rounded-full border border-white/15 object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-slate-900 text-2xl font-bold text-white">
              {(session.user.name ?? "U").slice(0, 1).toUpperCase()}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
