import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthSession, isAuthConfigured } from "@/auth";
import { DashboardActions } from "@/components/auth/dashboard-actions";
import { getTrackBySlug } from "@/components/training/module-catalog";

type TrackPageProps = {
  params: Promise<{
    track: string;
  }>;
};

export default async function TrackPage({ params }: TrackPageProps) {
  if (!isAuthConfigured) {
    redirect("/login");
  }

  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  const { track } = await params;
  const currentTrack = getTrackBySlug(track);

  if (!currentTrack) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <section className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:p-10">
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Trilha
              </span>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                Voltar para modulos
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {currentTrack.badge}
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                {currentTrack.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                {currentTrack.description}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {currentTrack.modules.map((module) => {
              const isAvailable = Boolean(module.href);

              const content = (
                <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30">
                  <div
                    className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${module.accent} opacity-90 blur-2xl transition duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
                        {module.badge}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                          isAvailable
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-amber-500/15 text-amber-200"
                        }`}
                      >
                        {module.status}
                      </span>
                    </div>

                    <div className="mt-10">
                      <h2 className="text-2xl font-black tracking-tight text-white">
                        {module.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {module.description}
                      </p>
                    </div>

                    <div className="mt-8">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                          isAvailable
                            ? "bg-emerald-500 text-white"
                            : "border border-white/15 bg-white/5 text-slate-200"
                        }`}
                      >
                        {isAvailable ? "Abrir modulo" : "Em construcao"}
                      </span>
                    </div>
                  </div>
                </div>
              );

              return isAvailable ? (
                <Link key={module.slug} href={module.href!}>
                  {content}
                </Link>
              ) : (
                <div key={module.slug}>{content}</div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Sessao atual
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <p>
                <span className="font-semibold text-white">Nome:</span>{" "}
                {session.user.name ?? "Nao informado"}
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                {session.user.email ?? "Nao informado"}
              </p>
              <p>
                <span className="font-semibold text-white">Acesso:</span> autenticado
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-emerald-400/15 bg-emerald-500/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Proxima etapa
            </p>
            <p className="mt-3 text-sm leading-7 text-emerald-50/90">
              Cada trilha concentra seus modulos. Em `Next.js`, o primeiro modulo ja
              esta conectado ao treinamento validado.
            </p>
          </div>

          <DashboardActions />
        </aside>
      </section>
    </main>
  );
}
