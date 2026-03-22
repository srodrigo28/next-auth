"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TrainingSection = {
  id: string;
  step: string;
  eyebrow: string;
  title: string;
  summary: string;
  bullets?: string[];
  checklist?: string[];
  code?: {
    title: string;
    content: string;
  };
  callout?: {
    title: string;
    content: string;
  };
};

const sections: TrainingSection[] = [
  {
    id: "intro",
    step: "00",
    eyebrow: "Modulo Inicial",
    title: "Introducao ao fluxo de Google Auth",
    summary:
      "Este treinamento organiza a trilha completa para montar login Google, sessao autenticada e dashboard protegido com Next.js App Router.",
    bullets: [
      "Objetivo: criar home, login, dashboard e acoes de sessao.",
      "Contexto atual: a base ja usa next-auth e middleware.",
      "Entrega esperada: fluxo pronto para validar local e publicar na Vercel.",
    ],
    callout: {
      title: "Saida esperada",
      content:
        "Ao final, voce consegue validar localmente, alinhar o Google Console e publicar a mesma configuracao em producao sem quebrar o login.",
    },
  },
  {
    id: "requisitos",
    step: "01",
    eyebrow: "Base Local",
    title: "Requisitos antes de tocar na autenticacao",
    summary:
      "Antes de configurar o OAuth, vale validar o ambiente local para evitar erros que parecem ser de auth, mas na verdade sao de setup.",
    bullets: [
      "Node.js instalado e NPM funcionando.",
      "Editor pronto para ajustar o projeto.",
      "Acesso ao Google Cloud Console.",
      "Projeto iniciando sem erros locais.",
    ],
    code: {
      title: "Validacao rapida",
      content: "node -v\nnpm -v",
    },
  },
  {
    id: "env",
    step: "02",
    eyebrow: "Variaveis",
    title: "Padrao do .env.local",
    summary:
      "A aplicacao foi normalizada para usar um conjunto pequeno e direto de variaveis. Isso reduz ambiguidade e evita deploy quebrado.",
    bullets: [
      "NEXTAUTH_SECRET para o segredo da sessao.",
      "NEXTAUTH_URL para a URL atual da aplicacao.",
      "AUTH_TRUST_HOST=true para ambiente hospedado.",
      "AUTH_GOOGLE_ID e AUTH_GOOGLE_SECRET para o cliente OAuth.",
      "NEXT_PORT_LOCAL apenas para desenvolvimento local.",
    ],
    code: {
      title: "Formato recomendado",
      content:
        'NEXT_PORT_LOCAL=3000\nNEXTAUTH_URL="http://localhost:3000"\nNEXTAUTH_SECRET="..."\nAUTH_TRUST_HOST=true\nAUTH_GOOGLE_ID="..."\nAUTH_GOOGLE_SECRET="..."',
    },
    callout: {
      title: "Atenção com a porta",
      content:
        "Se a porta local mudar, alinhe NEXT_PORT_LOCAL, NEXTAUTH_URL e as URLs cadastradas no Google Console. Se uma delas ficar diferente, o login pode falhar com redirect_uri_mismatch.",
    },
  },
  {
    id: "google-console",
    step: "03",
    eyebrow: "Google Console",
    title: "Configurando origens e callbacks",
    summary:
      "O Google valida dominio, porta e callback com bastante rigidez. Aqui a regra e simples: tudo precisa bater exatamente.",
    bullets: [
      "Origem local: http://localhost:3000",
      "Callback local: http://localhost:3000/api/auth/callback/google",
      "Origem producao: https://next-auth-omega-two.vercel.app",
      "Callback producao: https://next-auth-omega-two.vercel.app/api/auth/callback/google",
    ],
    checklist: [
      "Criar ou escolher um projeto no Google Cloud.",
      "Configurar a tela de consentimento OAuth.",
      "Criar cliente OAuth para aplicacao web.",
      "Copiar client id e client secret.",
      "Cadastrar origens e redirect URIs.",
    ],
    callout: {
      title: "Regra de ouro",
      content:
        "Se a URL cadastrada no Google nao bater exatamente com a URL usada pela aplicacao, o login falha.",
    },
  },
  {
    id: "vercel",
    step: "04",
    eyebrow: "Deploy",
    title: "Subindo na Vercel sem surpresa",
    summary:
      "Na Vercel, o principal e repetir as variaveis criticas do ambiente local e garantir que o Google Console ja conhece a URL publica.",
    bullets: [
      "NEXTAUTH_URL=https://next-auth-omega-two.vercel.app",
      "NEXTAUTH_SECRET com o valor correto",
      "AUTH_TRUST_HOST=true",
      "AUTH_GOOGLE_ID cadastrado na Vercel",
      "AUTH_GOOGLE_SECRET cadastrado na Vercel",
    ],
    checklist: [
      "Cadastrar variaveis de ambiente na Vercel.",
      "Confirmar a URL publica em NEXTAUTH_URL.",
      "Confirmar origem publicada no Google Console.",
      "Confirmar callback publicado no Google Console.",
    ],
    callout: {
      title: "Risco mais comum",
      content:
        "Mesmo com o deploy certo, o login continua falhando quando o Google Console ainda nao foi atualizado com a URL de producao.",
    },
  },
  {
    id: "fluxo",
    step: "05",
    eyebrow: "Fluxo",
    title: "Experiencia da aplicacao",
    summary:
      "O fluxo desta base foi desenhado para ser simples de validar: home, login, callback, dashboard e acoes de sessao.",
    checklist: [
      "Abrir a home.",
      "Clicar em entrar na conta.",
      "Autenticar com Google.",
      "Voltar para a aplicacao.",
      "Cair no dashboard.",
      "Atualizar perfil ou sair.",
    ],
  },
  {
    id: "estrutura",
    step: "06",
    eyebrow: "Arquitetura",
    title: "Arquivos principais da implementacao",
    summary:
      "A estrutura central ja esta organizada para Next.js App Router com rota de auth, dashboard privado e configuracao central da sessao.",
    code: {
      title: "Estrutura esperada",
      content:
        "src/\n  app/\n    api/\n      auth/\n        [...nextauth]/\n          route.ts\n    dashboard/\n      page.tsx\n    login/\n      page.tsx\n    treinamento/\n      page.tsx\n  auth.ts\n  proxy.ts",
    },
    bullets: [
      "src/auth.ts concentra a configuracao do next-auth.",
      "route.ts expoe login, callback, sessao e logout.",
      "proxy.ts protege o dashboard.",
      "As paginas usam Server Components para ler a sessao.",
    ],
  },
  {
    id: "testes",
    step: "07",
    eyebrow: "Validacao",
    title: "Checklist final de testes",
    summary:
      "Antes de considerar a base pronta, vale validar tanto a interface quanto o comportamento real do Google OAuth.",
    checklist: [
      "Home abre corretamente.",
      "Login abre corretamente.",
      "Dashboard exige autenticacao.",
      "Sair funciona.",
      "Atualizar perfil funciona.",
      "Origem local cadastrada.",
      "Origem publicada cadastrada.",
      "Callback local cadastrado.",
      "Callback de producao cadastrado.",
    ],
  },
  {
    id: "erros",
    step: "08",
    eyebrow: "Diagnostico",
    title: "Erros comuns e leitura rapida",
    summary:
      "Documentar os problemas recorrentes acelera bastante a depuracao no local e no deploy.",
    bullets: [
      "redirect_uri_mismatch: origem ou callback diferentes do Google Console.",
      "invalid_client: client id ou client secret incorretos.",
      "Falha so em producao: Google Console ou env da hospedagem incompletos.",
      "Dashboard sem sessao: NEXTAUTH_SECRET ausente ou auth incompleta.",
    ],
  },
];

type TrainingShellProps = {
  initialSectionId?: string;
};

export function TrainingShell({ initialSectionId }: TrainingShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fallbackId = sections[0]?.id ?? "intro";
  const safeInitialId = sections.some((section) => section.id === initialSectionId)
    ? (initialSectionId ?? fallbackId)
    : fallbackId;
  const querySectionId = searchParams.get("modulo");
  const activeId =
    (querySectionId && sections.some((section) => section.id === querySectionId)
      ? querySectionId
      : safeInitialId) ?? fallbackId;

  const activeSection =
    sections.find((section) => section.id === activeId) ?? sections[0];

  const activeIndex = sections.findIndex((section) => section.id === activeSection.id);

  function selectSection(sectionId: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (sectionId === fallbackId) {
      params.delete("modulo");
    } else {
      params.set("modulo", sectionId);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 sm:px-6 sm:py-8 xl:flex-row xl:items-start xl:gap-8">
      <div className="xl:hidden">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Treinamento protegido
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                Modulo {activeSection.step}
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-white">
              Google Auth em modulos
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Navegue pelos modulos com um seletor horizontal pensado para mobile.
            </p>
          </div>

          <div className="px-4 py-4">
            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {sections.map((section) => {
                const isActive = section.id === activeId;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => selectSection(section.id)}
                    className={`min-w-[15rem] shrink-0 rounded-[1.5rem] border px-4 py-4 text-left transition ${
                      isActive
                        ? "border-emerald-400/30 bg-emerald-500/10 shadow-lg shadow-emerald-950/30"
                        : "border-white/8 bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          isActive
                            ? "bg-emerald-400 text-slate-950"
                            : "bg-white/10 text-slate-100"
                        }`}
                      >
                        {section.step}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          {section.eyebrow}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-white">
                          {section.title}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <aside className="hidden xl:sticky xl:top-6 xl:block xl:w-80 xl:self-start">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 bg-white/5 p-5 sm:p-6">
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Treinamento protegido
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Google Auth em modulos
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Um roteiro visual e pratico, agora dentro da aplicacao e ajustado
              para desktop e mobile.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
              >
                Voltar para home
              </Link>
              <a
                href="/docs/next-google-auth.html"
                className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-emerald-400"
              >
                Versao HTML
              </a>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <nav className="grid gap-2">
              {sections.map((section) => {
                const isActive = section.id === activeId;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => selectSection(section.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-emerald-400/30 bg-emerald-500/10 shadow-lg shadow-emerald-950/30"
                        : "border-white/8 bg-white/[0.03] hover:border-sky-400/30 hover:bg-sky-500/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          isActive
                            ? "bg-emerald-400 text-slate-950"
                            : "bg-white/10 text-slate-100"
                        }`}
                      >
                        {section.step}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          {section.eyebrow}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-white">
                          {section.title}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-8 lg:p-10">
          <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Progresso
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Modulo {activeSection.step} de {sections.length - 1} etapas principais
                </p>
              </div>
              <div className="text-sm font-semibold text-white">
                {activeIndex + 1}/{sections.length}
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300 transition-all"
                style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                Modulo {activeSection.step}
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                {activeSection.eyebrow}
              </span>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <h2 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {activeSection.title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                  {activeSection.summary}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-emerald-400/15 bg-slate-950/35 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Roteiro rapido
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Use esta pagina como guia de implementacao e validacao. O
                  objetivo e reduzir idas e vindas entre docs soltas e manter o
                  treinamento com a mesma linguagem visual da aplicacao.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6">
            {activeSection.bullets?.length ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white">Pontos-chave</h3>
                <div className="mt-4 grid gap-3">
                  {activeSection.bullets.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeSection.checklist?.length ? (
              <div className="rounded-[1.5rem] border border-sky-400/15 bg-sky-500/[0.06] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white">Checklist</h3>
                <div className="mt-4 grid gap-3">
                  {activeSection.checklist.map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-4 rounded-2xl border border-sky-400/10 bg-slate-950/35 px-4 py-4"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-400 text-xs font-black text-slate-950">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-7 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeSection.code ? (
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/60">
                <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Codigo
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {activeSection.code.title}
                  </h3>
                </div>
                <pre className="overflow-x-auto p-5 text-sm leading-7 text-sky-100">
                  <code>{activeSection.code.content}</code>
                </pre>
              </div>
            ) : null}

            {activeSection.callout ? (
              <div className="rounded-[1.5rem] border border-amber-400/20 bg-amber-500/[0.08] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  {activeSection.callout.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-amber-50/90">
                  {activeSection.callout.content}
                </p>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  const previous = sections[activeIndex - 1];
                  if (previous) {
                    selectSection(previous.id);
                  }
                }}
                disabled={activeIndex === 0}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Modulo anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = sections[activeIndex + 1];
                  if (next) {
                    selectSection(next.id);
                  }
                }}
                disabled={activeIndex === sections.length - 1}
                className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proximo modulo
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
