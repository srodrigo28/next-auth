import { CourseShell, type CourseSection } from "@/components/training/course-shell";

const sections: CourseSection[] = [
  {
    id: "intro",
    step: "00",
    eyebrow: "Modulo Inicial",
    title: "Introducao ao Python com Django",
    summary:
      "Django e um framework web em Python voltado para sistemas mais completos, com estrutura forte para admin, ORM, autenticacao e crescimento organizado.",
    bullets: [
      "Muito usado em sistemas corporativos, paineis administrativos e backends robustos.",
      "Entrega uma estrutura mais opinativa do que Flask.",
      "Combina bem produtividade, seguranca e padrao de projeto.",
    ],
    callout: {
      title: "Leitura rapida",
      content:
        "Se o time quer sair do zero com uma base forte para backend e area administrativa, Django costuma acelerar bastante.",
    },
  },
  {
    id: "requisitos",
    step: "01",
    eyebrow: "Base",
    title: "Requisitos para comecar",
    summary:
      "Django fica mais facil quando a base de Python e de web ja esta minimamente alinhada.",
    bullets: [
      "Python 3 instalado.",
      "Editor preparado como VS Code ou PyCharm.",
      "Terminal com pip disponivel.",
      "Nocoes basicas de HTTP, rotas e HTML ajudam bastante.",
    ],
    code: {
      title: "Validacao rapida",
      content: "python --version\npip --version",
    },
  },
  {
    id: "django-core",
    step: "02",
    eyebrow: "Framework",
    title: "O que faz Django ser tao forte",
    summary:
      "A proposta do Django e entregar uma base completa logo no inicio, reduzindo o trabalho manual em autenticacao, banco, admin e organizacao.",
    checklist: [
      "ORM para banco relacional.",
      "Admin nativo para backoffice.",
      "Sistema de autenticacao pronto.",
      "Separacao por apps.",
      "Estrutura madura para projetos maiores.",
    ],
    callout: {
      title: "Diferenca pratica",
      content:
        "Django costuma ganhar quando a aplicacao precisa de mais estrutura pronta. Flask costuma ganhar quando a leveza inicial pesa mais.",
    },
  },
  {
    id: "project-apps",
    step: "03",
    eyebrow: "Estrutura",
    title: "Projeto principal e apps",
    summary:
      "Uma das ideias centrais do Django e separar a configuracao global do projeto dos apps que representam dominios de negocio.",
    bullets: [
      "O projeto concentra settings, urls globais e configuracao central.",
      "Os apps encapsulam partes como usuarios, produtos, pedidos ou blog.",
      "Isso ajuda a manter a base mais organizada conforme o sistema cresce.",
    ],
    code: {
      title: "Estrutura inicial comum",
      content: "config/\ncore/\nusuarios/\nprodutos/\npedidos/\nmanage.py",
    },
  },
  {
    id: "urls-views",
    step: "04",
    eyebrow: "Rotas",
    title: "URLs, views e resposta da aplicacao",
    summary:
      "O fluxo basico do Django passa por URL, view e resposta. Essa camada organiza como a aplicacao responde para navegador, API ou area interna.",
    bullets: [
      "URLs mapeiam os caminhos.",
      "Views concentram a logica da resposta.",
      "A resposta pode ser template HTML, JSON ou redirecionamento.",
    ],
    code: {
      title: "View simples",
      content:
        'from django.http import HttpResponse\n\n\ndef home(request):\n    return HttpResponse("Ola, Django!")',
    },
  },
  {
    id: "models-orm",
    step: "05",
    eyebrow: "Banco",
    title: "Models e ORM",
    summary:
      "O ORM do Django permite modelar entidades e conversar com banco relacional de forma produtiva, sem abandonar totalmente a clareza da estrutura.",
    bullets: [
      "Models representam tabelas e relacionamentos.",
      "Migracoes controlam a evolucao do schema.",
      "Consultas, filtros e ordenacoes ficam mais legiveis para o time.",
    ],
    code: {
      title: "Model basico",
      content:
        "from django.db import models\n\n\nclass Produto(models.Model):\n    nome = models.CharField(max_length=120)\n    preco = models.DecimalField(max_digits=10, decimal_places=2)\n    ativo = models.BooleanField(default=True)",
    },
  },
  {
    id: "libraries",
    step: "06",
    eyebrow: "Stack",
    title: "Bibliotecas que aparecem bastante",
    summary:
      "O ecossistema do Django cresce bem quando voce combina o framework com bibliotecas maduras para API, configuracao, testes e producao.",
    checklist: [
      "djangorestframework para APIs REST.",
      "django-environ para configuracao por ambiente.",
      "Pillow para imagem.",
      "psycopg para PostgreSQL.",
      "celery para tarefas assincronas.",
      "whitenoise para arquivos estaticos.",
      "pytest-django para testes.",
    ],
  },
  {
    id: "setup",
    step: "07",
    eyebrow: "Setup",
    title: "Comandos iniciais do projeto",
    summary:
      "Esses comandos montam uma base limpa para comecar um projeto Django com ambiente virtual e servidor local.",
    code: {
      title: "Ambiente inicial",
      content:
        "python -m venv venv\nvenv\\Scripts\\activate\npip install django\ndjango-admin startproject config .\npython manage.py runserver",
    },
    callout: {
      title: "Proximo passo natural",
      content:
        "Depois do setup, o fluxo tipico e criar um app, registrar models no admin e montar a primeira pagina ou API.",
    },
  },
  {
    id: "examples",
    step: "08",
    eyebrow: "Full Stack",
    title: "Exemplos de evolucao real",
    summary:
      "Este modulo e full stack porque Django pode entregar pagina renderizada, painel administrativo e backend estruturado dentro da mesma base.",
    bullets: [
      "Criar app de usuarios ou produtos com models e admin.",
      "Construir paginas com templates e heranca de layout.",
      "Transformar o projeto em API com Django REST Framework.",
    ],
    callout: {
      title: "Por que full stack aqui",
      content:
        "Django cobre muito bem backend, camada de renderizacao server-side e administracao do sistema no mesmo projeto.",
    },
  },
  {
    id: "summary",
    step: "09",
    eyebrow: "Resumo",
    title: "Fechamento da trilha Django",
    summary:
      "Django continua sendo uma escolha muito forte quando o projeto pede padrao, velocidade com recursos prontos e uma base que aguente crescimento organizado.",
    bullets: [
      "Python segue excelente para web profissional.",
      "Django e muito forte para estrutura, admin e produtividade.",
      "Projeto + apps ajudam a manter organizacao de dominio.",
      "ORM e admin aceleram muito sistemas internos e corporativos.",
    ],
  },
];

type PythonDjangoShellProps = {
  initialSectionId?: string;
};

export function PythonDjangoShell({ initialSectionId }: PythonDjangoShellProps) {
  return (
    <CourseShell
      title="Python Django em modulos"
      mobileIntro="Trilha protegida, com foco em Django como stack full stack dentro do ecossistema Python."
      desktopIntro="Guia visual dentro da aplicacao, seguindo o mesmo padrao do treinamento de Next.js."
      heroLabel="Python full stack"
      sideLabel="Trilha Django"
      sideDescription="Este modulo foi organizado como full stack porque Django cobre muito bem estrutura de backend, renderizacao server-side e backoffice administrativo."
      backHref="/dashboard/python"
      backLabel="Voltar para Python"
      htmlHref="/docs/python-django.html"
      htmlLabel="Versao HTML"
      sections={sections}
      initialSectionId={initialSectionId}
      theme={{
        accentBadge: "border-sky-400/20 bg-sky-500/10 text-sky-300",
        accentButton: "bg-sky-500",
        accentButtonHover: "hover:bg-sky-400",
        progressGradient:
          "bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-300",
        asideBorder: "border-sky-400/15",
        asideText: "text-sky-300",
        navActive: "border-sky-400/30 bg-sky-500/10",
        navActiveShadow: "shadow-lg shadow-sky-950/30",
        chipAccent: "bg-sky-400 text-slate-950",
      }}
    />
  );
}
