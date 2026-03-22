import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession, isAuthConfigured } from "@/auth";
import { DashboardActions } from "@/components/auth/dashboard-actions";
import { moduleCatalog } from "@/components/training/module-catalog";

export default async function DashboardPage() {
  if (!isAuthConfigured) {
    redirect("/login");
  }

  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <section className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:p-10">
        <div className="space-y-8">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Dashboard de modulos
            </span>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Escolha sua trilha de estudo
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                  Organizei o ambiente autenticado como uma biblioteca de modulos.
                  Cada card abre uma trilha com seus treinamentos internos.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Sessao ativa
                </p>
                <p className="mt-3 text-sm font-semibold text-white">
                  {session.user.name ?? "Usuario autenticado"}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {session.user.email ?? "Email nao informado"}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Comece por `Next.js` para abrir o treinamento de Google Auth que ja
                  esta pronto.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {moduleCatalog.map((track) => (
              <Link key={track.slug} href={`/dashboard/${track.slug}`}>
                <article className="group relative h-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-slate-950/45 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30">
                  <div
                    className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-br ${track.accent} opacity-90 blur-2xl transition duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
                        {track.badge}
                      </span>
                      <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                        {track.modules.length} modulos
                      </span>
                    </div>

                    <div className="mt-12 flex-1">
                      <h2 className="text-3xl font-black tracking-tight text-white">
                        {track.title}
                      </h2>
                      <p className="mt-4 text-sm leading-8 text-slate-300">
                        {track.description}
                      </p>
                    </div>

                    <div className="mt-8 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-400">
                      Abrir trilha
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="flex items-start justify-center rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6">
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
          </div>

          <div className="rounded-[1.75rem] border border-sky-400/15 bg-sky-500/10 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-sky-300">
              Estrutura inicial
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-100">
              <p>Next.js ja aponta para o modulo `next-google-auth`.</p>
              <p>Python abre caminho para `Django` e `Flask`.</p>
              <p>Java fica pronto para os proximos treinamentos.</p>
            </div>
          </div>

          <DashboardActions />
        </aside>
      </section>
    </main>
  );
}
