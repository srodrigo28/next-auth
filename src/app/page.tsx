import Link from "next/link";
import { getAuthSession, isAuthConfigured } from "@/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-1 items-center px-6 py-16">
      <section className="grid w-full gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:grid-cols-[1.2fr_.8fr] md:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Treinamento Validado
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              Home com login Google e dashboard autenticado em Next.js
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Esta base ja possui a estrutura do treinamento e agora esta ligada ao fluxo
              real de autenticacao com Google.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={isAuthConfigured ? (session ? "/dashboard" : "/login") : "/login"}
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              {isAuthConfigured
                ? session
                  ? "Abrir dashboard"
                  : "Entrar na conta"
                : "Ver configuracao de login"}
            </Link>
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-sky-400/15 bg-slate-950/35 p-6">
          <h2 className="text-lg font-bold text-white">Status atual</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
            <p>Projeto Next.js com App Router.</p>
            <p>
              Login Google{" "}
              {isAuthConfigured ? "configurado com `next-auth`." : "aguardando variaveis no deploy."}
            </p>
            <p>Dashboard protegido por middleware.</p>
            <p>Botao para atualizar perfil e sair.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
