export type ModuleItem = {
  slug: string;
  title: string;
  description: string;
  href?: string;
  badge: string;
  status: "Disponivel" | "Em breve";
  accent: string;
};

export type ModuleTrack = {
  slug: string;
  title: string;
  description: string;
  badge: string;
  accent: string;
  modules: ModuleItem[];
};

export const moduleCatalog: ModuleTrack[] = [
  {
    slug: "nextjs",
    title: "Next.js",
    description:
      "Trilha focada em App Router, autenticacao, deploy e organizacao de projetos modernos.",
    badge: "Frontend + Full Stack",
    accent: "from-emerald-400/30 via-sky-400/20 to-transparent",
    modules: [
      {
        slug: "next-google-auth",
        title: "Next Google Auth",
        description:
          "Fluxo completo com login Google, next-auth, dashboard protegido e deploy na Vercel.",
        href: "/treinamento?modulo=intro",
        badge: "Modulo validado",
        status: "Disponivel",
        accent: "from-emerald-400 via-sky-400 to-cyan-300",
      },
    ],
  },
  {
    slug: "python",
    title: "Python",
    description:
      "Trilhas para backend, APIs e fundamentos de frameworks Python com foco em aplicacao real.",
    badge: "Backend",
    accent: "from-sky-400/30 via-cyan-400/20 to-transparent",
    modules: [
      {
        slug: "django",
        title: "Django",
        description:
          "Estrutura de projeto, apps, ORM, autenticacao e deploy com organizacao profissional.",
        href: "/treinamento/python-django?modulo=intro",
        badge: "Modulo full stack",
        status: "Disponivel",
        accent: "from-sky-400 via-blue-400 to-cyan-300",
      },
      {
        slug: "flask",
        title: "Flask",
        description:
          "APIs leves, blueprints, configuracao por ambiente e extensoes para crescimento gradual.",
        href: "/treinamento/python-flask?modulo=intro",
        badge: "Modulo full stack",
        status: "Disponivel",
        accent: "from-cyan-400 via-sky-400 to-teal-300",
      },
    ],
  },
  {
    slug: "java",
    title: "Java",
    description:
      "Espaco para trilhas enterprise e APIs modernas com ecossistema Java.",
    badge: "Enterprise",
    accent: "from-amber-400/30 via-orange-400/20 to-transparent",
    modules: [
      {
        slug: "spring-boot",
        title: "Spring Boot",
        description:
          "Criacao de APIs, estrutura por camadas, seguranca e deploy para ambientes corporativos.",
        badge: "Planejado",
        status: "Em breve",
        accent: "from-amber-400 via-orange-400 to-yellow-300",
      },
      {
        slug: "java-core",
        title: "Java Core",
        description:
          "Base de orientacao a objetos, colecoes, streams e estrutura para entrevistas e projetos.",
        badge: "Planejado",
        status: "Em breve",
        accent: "from-orange-400 via-amber-400 to-red-300",
      },
    ],
  },
];

export function getTrackBySlug(slug: string) {
  return moduleCatalog.find((track) => track.slug === slug);
}
