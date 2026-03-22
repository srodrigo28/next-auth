"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type CourseSection = {
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

type CourseTheme = {
  accentBadge: string;
  accentButton: string;
  accentButtonHover: string;
  progressGradient: string;
  asideBorder: string;
  asideText: string;
  navActive: string;
  navActiveShadow: string;
  chipAccent: string;
};

type CourseShellProps = {
  title: string;
  mobileIntro: string;
  desktopIntro: string;
  heroLabel: string;
  sideLabel: string;
  sideDescription: string;
  homeHref?: string;
  backHref: string;
  backLabel: string;
  htmlHref: string;
  htmlLabel: string;
  sections: CourseSection[];
  initialSectionId?: string;
  theme: CourseTheme;
};

export function CourseShell({
  title,
  mobileIntro,
  desktopIntro,
  heroLabel,
  sideLabel,
  sideDescription,
  homeHref,
  backHref,
  backLabel,
  htmlHref,
  htmlLabel,
  sections,
  initialSectionId,
  theme,
}: CourseShellProps) {
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

  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];
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
    <main className="mx-auto flex min-h-screen w-full max-w-[2200px] flex-1 flex-col gap-4 px-4 py-4 sm:px-6 sm:py-8 xl:flex-row xl:items-start xl:gap-10 2xl:px-8">
      <div className="xl:hidden">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${theme.accentBadge}`}>
                {heroLabel}
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                Modulo {activeSection.step}
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">{mobileIntro}</p>
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
                        ? `${theme.navActive} ${theme.navActiveShadow}`
                        : "border-white/8 bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          isActive ? theme.chipAccent : "bg-white/10 text-slate-100"
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

      <aside className="hidden xl:block xl:w-[360px] xl:self-start xl:sticky xl:top-6 2xl:w-[400px]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 bg-white/5 p-5 sm:p-6">
            <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${theme.accentBadge}`}>
              {heroLabel}
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">{desktopIntro}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={backHref}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
              >
                {backLabel}
              </Link>
              {homeHref ? (
                <Link
                  href={homeHref}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
                >
                  Home
                </Link>
              ) : null}
              <a
                href={htmlHref}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition ${theme.accentButton} ${theme.accentButtonHover}`}
              >
                {htmlLabel}
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
                        ? `${theme.navActive} ${theme.navActiveShadow}`
                        : "border-white/8 bg-white/[0.03] hover:border-sky-400/30 hover:bg-sky-500/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          isActive ? theme.chipAccent : "bg-white/10 text-slate-100"
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
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-8 lg:p-10 2xl:p-12">
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
                className={`h-2 rounded-full transition-all ${theme.progressGradient}`}
                style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${theme.accentBadge}`}>
                Modulo {activeSection.step}
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                {activeSection.eyebrow}
              </span>
            </div>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,.9fr)] xl:items-end 2xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,.9fr)]">
              <div>
                <h2 className="max-w-5xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl 2xl:max-w-6xl 2xl:text-6xl">
                  {activeSection.title}
                </h2>
                <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300 sm:text-base 2xl:max-w-6xl">
                  {activeSection.summary}
                </p>
              </div>
              <div className={`rounded-[1.5rem] border bg-slate-950/35 p-5 ${theme.asideBorder}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.asideText}`}>
                  {sideLabel}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{sideDescription}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6">
            {activeSection.bullets?.length ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white">Pontos-chave</h3>
                <div className="mt-4 grid gap-3 2xl:grid-cols-2">
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
                <div className="mt-4 grid gap-3 2xl:grid-cols-2">
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
                <pre className="overflow-x-auto p-5 text-sm leading-7 text-sky-100 2xl:text-[15px]">
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
                className={`rounded-full px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${theme.accentButton} ${theme.accentButtonHover}`}
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
