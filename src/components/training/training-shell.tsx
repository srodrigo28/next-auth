import { CourseShell, type CourseSection } from "@/components/training/course-shell";

const sections: CourseSection[] = [
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
      title: "Atencao com a porta",
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
  return (
    <CourseShell
      title="Google Auth em modulos"
      mobileIntro="Navegue pelos modulos com um seletor horizontal pensado para mobile."
      desktopIntro="Um roteiro visual e pratico, agora dentro da aplicacao e ajustado para desktop e mobile."
      heroLabel="Treinamento protegido"
      sideLabel="Roteiro rapido"
      sideDescription="Use esta pagina como guia de implementacao e validacao. O objetivo e reduzir idas e vindas entre docs soltas e manter o treinamento com a mesma linguagem visual da aplicacao."
      backHref="/dashboard/nextjs"
      backLabel="Voltar para Next.js"
      homeHref="/"
      htmlHref="/docs/next-google-auth.html"
      htmlLabel="Versao HTML"
      sections={sections}
      initialSectionId={initialSectionId}
      theme={{
        accentBadge:
          "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
        accentButton: "bg-emerald-500",
        accentButtonHover: "hover:bg-emerald-400",
        progressGradient:
          "bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300",
        asideBorder: "border-emerald-400/15",
        asideText: "text-emerald-300",
        navActive: "border-emerald-400/30 bg-emerald-500/10",
        navActiveShadow: "shadow-lg shadow-emerald-950/30",
        chipAccent: "bg-emerald-400 text-slate-950",
      }}
    />
  );
}
