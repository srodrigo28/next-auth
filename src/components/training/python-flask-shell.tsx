import { CourseShell, type CourseSection } from "@/components/training/course-shell";

const sections: CourseSection[] = [
  {
    id: "intro",
    step: "00",
    eyebrow: "Modulo Inicial",
    title: "Introducao ao Python com Flask",
    summary:
      "Flask e um microframework web leve, flexivel e excelente para APIs, MVPs, dashboards internos e para aprender o fluxo real de uma aplicacao web sem excesso de abstracao.",
    bullets: [
      "Python e claro, produtivo e muito forte em backend.",
      "Flask comeca pequeno e cresce bem com extensoes.",
      "O framework ajuda a entender rotas, requests, responses e templates com mais transparencia.",
    ],
    callout: {
      title: "Quando ele brilha",
      content:
        "Flask costuma ser uma otima escolha quando a equipe quer liberdade de arquitetura, curva mais direta e um backend que possa crescer gradualmente.",
    },
  },
  {
    id: "requisitos",
    step: "01",
    eyebrow: "Base",
    title: "Requisitos para comecar",
    summary:
      "Para tirar proveito do Flask, vale chegar com Python instalado e uma base minima de terminal, editor e nocoes web.",
    bullets: [
      "Python 3 instalado.",
      "Editor preparado como VS Code.",
      "Terminal com pip disponivel.",
      "Nocoes iniciais de HTTP, rotas e JSON ajudam bastante.",
    ],
    code: {
      title: "Validacao rapida",
      content: "python --version\npip --version",
    },
  },
  {
    id: "flask-core",
    step: "02",
    eyebrow: "Framework",
    title: "O que faz Flask ser tao adotado",
    summary:
      "Flask entrega o nucleo essencial para web e deixa o time escolher como a aplicacao vai crescer, o que da bastante controle sobre a arquitetura.",
    checklist: [
      "Aplicacao leve e facil de iniciar.",
      "Rotas simples e legiveis.",
      "Boa base para APIs REST.",
      "Templates server-side quando necessario.",
      "Evolucao gradual com extensoes.",
    ],
    callout: {
      title: "Leve nao significa fraco",
      content:
        "Flask e leve no inicio, mas pode virar base profissional com SQLAlchemy, autenticacao, testes, middlewares e configuracao por ambiente.",
    },
  },
  {
    id: "first-setup",
    step: "03",
    eyebrow: "Primeiro Setup",
    title: "Subindo a primeira aplicacao Flask",
    summary:
      "O setup inicial do Flask e um dos grandes atrativos da stack: voce sobe algo funcional muito rapido e depois vai refinando a estrutura.",
    code: {
      title: "Primeiro app.py",
      content:
        'from flask import Flask\n\napp = Flask(__name__)\n\n\n@app.route("/")\ndef home():\n    return "Ola, Flask!"',
    },
    callout: {
      title: "Mentalidade certa",
      content:
        "No Flask, vale comecar simples e modularizar aos poucos. Isso mantem clareza sem engessar o projeto cedo demais.",
    },
  },
  {
    id: "routes-basic",
    step: "04",
    eyebrow: "Rotas",
    title: "Rotas basicas e fluxo de resposta",
    summary:
      "A camada de rotas e uma das portas de entrada mais importantes no Flask. Ela deixa muito claro como cada URL responde.",
    bullets: [
      "Cada rota mapeia um caminho da aplicacao.",
      "As funcoes retornam HTML, texto, JSON ou redirecionamento.",
      "A leitura das rotas costuma ser direta, o que ajuda muito no aprendizado.",
    ],
    code: {
      title: "Rotas basicas",
      content:
        'from flask import Flask\n\napp = Flask(__name__)\n\n\n@app.route("/")\ndef home():\n    return "Home"\n\n\n@app.route("/sobre")\ndef sobre():\n    return "Pagina sobre"',
    },
  },
  {
    id: "routes-params",
    step: "05",
    eyebrow: "Parametros",
    title: "Capturando parametros pela URL",
    summary:
      "Flask facilita bastante o trabalho com parametros dinamicos, o que ajuda em rotas de usuario, produto, slug e outros identificadores.",
    code: {
      title: "Parametro dinamico",
      content:
        'from flask import Flask\n\napp = Flask(__name__)\n\n\n@app.route("/usuarios/<nome>")\ndef usuario(nome):\n    return f"Ola, {nome}!"',
    },
  },
  {
    id: "routes-templates",
    step: "06",
    eyebrow: "Templates",
    title: "Renderizando HTML com templates",
    summary:
      "Mesmo sendo muito usado para API, Flask tambem funciona bem para telas server-side com Jinja2, layouts e paginas internas.",
    bullets: [
      "Templates ajudam a separar view e apresentacao.",
      "Jinja2 suporta variaveis, loops e condicionais.",
      "E uma base boa para dashboards e paineis internos.",
    ],
    code: {
      title: "Render template",
      content:
        'from flask import Flask, render_template\n\napp = Flask(__name__)\n\n\n@app.route("/")\ndef home():\n    return render_template("index.html", titulo="Painel Flask")',
    },
  },
  {
    id: "routes-api",
    step: "07",
    eyebrow: "API",
    title: "Endpoints JSON e base para APIs",
    summary:
      "Flask e muito popular em APIs leves. O retorno JSON fica simples de ler e de evoluir.",
    code: {
      title: "Rota JSON",
      content:
        'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n\n@app.route("/usuarios")\ndef usuarios():\n    return jsonify([\n        {"id": 1, "nome": "Ana"},\n        {"id": 2, "nome": "Carlos"}\n    ])',
    },
    callout: {
      title: "Boa porta para backend",
      content:
        "Para APIs internas, integracoes ou MVPs, Flask costuma entregar um caminho curto entre ideia e implementacao funcional.",
    },
  },
  {
    id: "libraries",
    step: "08",
    eyebrow: "Ecossistema",
    title: "Bibliotecas que aparecem bastante no Flask",
    summary:
      "Como Flask e enxuto, o ecossistema de extensoes e uma parte importante da experiencia full stack.",
    checklist: [
      "Flask-SQLAlchemy para banco.",
      "Flask-Migrate para migracoes.",
      "python-dotenv para ambiente.",
      "Flask-JWT-Extended para autenticacao JWT.",
      "Flask-Login para sessao tradicional.",
      "pytest para testes.",
      "gunicorn para producao.",
    ],
  },
  {
    id: "setup",
    step: "09",
    eyebrow: "Setup",
    title: "Comandos iniciais do projeto",
    summary:
      "Este setup monta uma base pratica e profissional para comecar um projeto Flask.",
    code: {
      title: "Ambiente inicial",
      content:
        "python -m venv venv\nvenv\\Scripts\\activate\npip install flask python-dotenv\npip freeze > requirements.txt\nflask --app app run --debug",
    },
  },
  {
    id: "examples",
    step: "10",
    eyebrow: "Aplicacao",
    title: "Exemplos de evolucao pratica",
    summary:
      "Depois do hello world, estes sao caminhos muito comuns de crescimento para um projeto Flask.",
    bullets: [
      "Criar rota /usuarios retornando JSON.",
      "Conectar Flask ao PostgreSQL com SQLAlchemy.",
      "Adicionar login, JWT e protecao de rotas.",
      "Organizar o projeto com blueprints.",
    ],
    callout: {
      title: "Por que ele entra como full stack",
      content:
        "Flask pode servir HTML, entregar API, autenticar usuario e estruturar banco. A diferenca e que voce vai escolhendo as pecas conforme a necessidade.",
    },
  },
  {
    id: "summary",
    step: "11",
    eyebrow: "Resumo",
    title: "Fechamento da trilha Flask",
    summary:
      "Flask segue sendo uma excelente entrada para backend em Python e tambem uma base muito valida para produtos reais quando a equipe quer liberdade e clareza de arquitetura.",
    bullets: [
      "Python e produtivo, legivel e versatil.",
      "Flask entrega um caminho leve para APIs e web apps.",
      "Extensoes cobrem banco, auth, testes e deploy.",
      "O proximo passo natural e versionar um projeto com API simples e banco conectado.",
    ],
  },
];

type PythonFlaskShellProps = {
  initialSectionId?: string;
};

export function PythonFlaskShell({ initialSectionId }: PythonFlaskShellProps) {
  return (
    <CourseShell
      title="Python Flask em modulos"
      mobileIntro="Trilha protegida para Flask com foco em APIs, rotas e evolucao gradual da stack."
      desktopIntro="Guia visual dentro da aplicacao, seguindo o mesmo padrao da trilha Django e do treinamento de Next.js."
      heroLabel="Python full stack"
      sideLabel="Trilha Flask"
      sideDescription="Este modulo foca em Flask como stack flexivel para APIs, paginas renderizadas e backends leves com crescimento controlado."
      backHref="/dashboard/python"
      backLabel="Voltar para Python"
      htmlHref="/docs/flask.html"
      htmlLabel="Versao HTML"
      sections={sections}
      initialSectionId={initialSectionId}
      theme={{
        accentBadge:
          "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
        accentButton: "bg-emerald-500",
        accentButtonHover: "hover:bg-emerald-400",
        progressGradient:
          "bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-300",
        asideBorder: "border-emerald-400/15",
        asideText: "text-emerald-300",
        navActive: "border-emerald-400/30 bg-emerald-500/10",
        navActiveShadow: "shadow-lg shadow-emerald-950/30",
        chipAccent: "bg-emerald-400 text-slate-950",
      }}
    />
  );
}
