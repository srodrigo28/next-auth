# Roteiro Validado - Next.js com Google Auth

## Visão geral

Este roteiro acompanha o treinamento visual em `docs/next-google-auth.html`.

A proposta é manter os dois arquivos sincronizados:

- `docs/next-google-auth.html` como treinamento principal
- `roteiro.md` como versão textual de apoio

## Objetivo da base

Construir uma aplicação com:

- home com opção de entrar na conta
- tela de login com Google Auth
- dashboard autenticado
- botão de sair
- botão de atualizar perfil

## Estado atual validado

A estrutura-base do treinamento agora já existe no projeto:

- `src/app/login/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/auth.ts`
- `src/proxy.ts`

Observação:

- a integracao real com `next-auth` ja foi aplicada
- home, login e dashboard ja estao conectados ao fluxo de autenticacao

## Passo 1 - Requisitos

Antes de iniciar:

- ter Node.js instalado
- ter NPM funcionando
- ter um editor como VS Code
- ter acesso ao Google Cloud Console

### Validação rápida

```bash
node -v
npm -v
```

## Passo 2 - Criar o projeto Next.js

Se fosse iniciar do zero:

```bash
npx create-next-app@latest next-auth
cd next-auth
npm run dev
```

No projeto atual, essa etapa já está atendida, porque a aplicação já existe.

## Passo 3 - Ler e validar o `.env.local`

Hoje o projeto já possui:

- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `NEXTAUTH_LOCAL_URL`
- `NEXTAUTH_EXTERNO_URL`
- `NEXT_PORT_LOCAL`

### Ajuste esperado

Padronizar a variável principal de URL para a biblioteca de autenticação:

```env
AUTH_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_URL="http://localhost:3050"
AUTH_TRUST_HOST=true
```

### Aviso importante sobre porta local

Nesta base, a porta local do projeto esta configurada por:

```env
NEXT_PORT_LOCAL=3050
```

Isso significa que a aplicacao local deve responder em:

- `http://localhost:3050`

Se o projeto mudar de porta, voce precisa alinhar ao mesmo tempo:

- `NEXT_PORT_LOCAL`
- `NEXTAUTH_LOCAL_URL`
- `NEXTAUTH_URL`
- `AUTH_URL`
- origem local no Google Console
- callback local no Google Console

Se uma dessas partes ficar em `3000` e outra em `3050`, o login pode falhar com `redirect_uri_mismatch`.

## Passo 4 - Google Console

No Google Cloud Console, precisamos:

1. criar ou escolher um projeto
2. configurar a tela de consentimento OAuth
3. criar o cliente OAuth para aplicação web
4. copiar `client id` e `client secret`
5. cadastrar as origens autorizadas
6. cadastrar as URIs de redirecionamento

### Origens autorizadas deste projeto

- `http://localhost:3050`
- `https://next-auth-cyan-three.vercel.app`

### Callbacks autorizados deste projeto

- `http://localhost:3050/api/auth/callback/google`
- `https://next-auth-cyan-three.vercel.app/api/auth/callback/google`

### Regra principal

Se a URL da aplicação não bater exatamente com a URL cadastrada no Google Console, o login falha.

### Aviso reforçado sobre portas

O erro que mais facilmente aparece quando trocamos a porta local e esquecemos o Google Console e:

- `redirect_uri_mismatch`

Exemplo real de conflito:

- aplicacao local rodando em `http://localhost:3050`
- Google Console ainda cadastrado com `http://localhost:3000`

Nesse caso, o Google bloqueia o login porque entende que o callback enviado pelo app nao corresponde ao callback autorizado.

### Checklist rapido quando mudar de porta

Se a porta local mudar, revise imediatamente:

1. `.env.local`
2. script `npm run dev`
3. origem local no Google Console
4. callback local no Google Console
5. URL que voce esta abrindo no navegador

## Passo 5 - Fluxo da aplicação

Fluxo esperado:

1. abrir a home
2. clicar em entrar na conta
3. acessar a tela de login
4. clicar em entrar com Google
5. autenticar no Google
6. voltar para a aplicação
7. cair no dashboard
8. atualizar perfil, se necessário
9. sair da conta

## Passo 6 - Estrutura esperada

```text
src/
  app/
    api/
      auth/
        [...nextauth]/
          route.ts
    dashboard/
      page.tsx
    login/
      page.tsx
    page.tsx
  auth.ts
  proxy.ts
```

## Passo 7 - Implementação técnica

### Etapa 1

Instalar a biblioteca:

```bash
npm install next-auth
```

Status atual:

- concluido

### Etapa 2

Criar a configuração central do auth com Google Provider.

Status atual:

- concluido em `src/auth.ts`

### Etapa 3

Criar a rota de autenticação para login, callback, sessão e logout.

Status atual:

- concluido em `src/app/api/auth/[...nextauth]/route.ts`

### Etapa 4

Criar a home com botão para entrar na conta.

Status atual:

- concluido

### Etapa 5

Criar a tela de login com Google Auth.

Status atual:

- concluido

### Etapa 6

Criar o dashboard autenticado.

Status atual:

- concluido

### Etapa 7

Proteger o dashboard.

Status atual:

- concluido com `src/proxy.ts`

### Etapa 8

Implementar atualizar perfil e sair.

Status atual:

- concluido

## Passo 8 - Telas

### Home

- título
- descrição curta
- botão `Entrar na conta`

### Login

- botão `Entrar com Google`
- explicação do fluxo
- redirecionamento após autenticação

### Dashboard

- nome
- email
- foto
- botão `Atualizar perfil`
- botão `Sair`

## Passo 9 - O que significa atualizar perfil

Na base inicial:

- revalidar a sessão
- atualizar os dados vindos do Google
- renderizar novamente o dashboard com nome, email e foto atualizados

## Passo 10 - Checklist de testes

### Interface

- home abre corretamente
- login abre corretamente
- dashboard exige autenticação
- sair funciona
- atualizar perfil funciona

### Google Console

- origem local cadastrada
- origem publicada cadastrada
- callback local cadastrado
- callback publicado cadastrado

## Passo 11 - Erros comuns

### `redirect_uri_mismatch`

A URI cadastrada no Google está diferente da URI usada pela aplicação.

Causa comum nesta base:

- projeto rodando em `3050`
- Google Console ainda configurado com `3000`

### `invalid_client`

O client id ou client secret estão incorretos.

### Funciona localmente e quebra em produção

Normalmente:

- a URL publicada não foi cadastrada
- as variáveis de ambiente da hospedagem não foram configuradas

### Dashboard sem sessão

Normalmente:

- `AUTH_SECRET` ausente
- configuração de auth incompleta
- sessão sendo lida da forma errada

## Resumo final

Nosso treinamento validado agora segue esta ordem:

1. requisitos com Node.js
2. criação do projeto Next.js
3. validação do `.env.local`
4. configuração do Google Console
5. definição do fluxo da aplicação
6. implementação técnica do auth
7. criação das telas
8. testes
9. revisão de erros comuns

## Próximo passo

A próxima etapa prática pode ser:

1. testar login real no navegador
2. validar callback local com a conta Google
3. publicar as mesmas variáveis no ambiente de produção
4. ajustar o dashboard visualmente, se quisermos evoluir a interface
