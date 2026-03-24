# Plano evolutivo de aulas, acesso e estatisticas

## 1. Objetivo

Este documento define uma evolucao modular para o projeto `next-auth`, permitindo:

- controlar acesso por usuario, perfil, trilha, modulo e aula
- criar muitos treinamentos sem reescrever a estrutura base
- manter conteudo evolutivo com baixo acoplamento
- registrar eventos de uso para gerar estatisticas reais do produto
- atender bem notebook, desktop e mobile
- integrar o frontend em Next.js com uma API backend em Python Flask

A ideia central e separar claramente:

- autenticacao e experiencia do usuario no Next.js
- regras de conteudo e consumo no dominio de treinamento
- coleta e consolidacao de estatisticas em uma API Flask modular

## 2. Leitura do estado atual

Hoje o projeto ja tem uma base importante pronta:

- autenticacao com `next-auth`
- dashboard autenticado
- trilhas visuais em `module-catalog`
- paginas de treinamento para `Next.js`, `Django` e `Flask`
- estrutura em App Router no Next.js 16

Isso e um bom ponto de partida porque ja existe:

- entrada autenticada
- separacao inicial por trilhas
- componentes reutilizaveis para treinamento

O proximo passo nao precisa reescrever tudo. Podemos evoluir em cima da base atual.

## 3. Visao de produto

Vamos pensar o produto como uma plataforma interna de treinamentos com 5 blocos:

1. `Identidade e acesso`
2. `Catalogo de conteudo`
3. `Entrega das aulas`
4. `Eventos e estatisticas`
5. `Painel administrativo`

## 4. Modelo modular recomendado

### 4.1 Hierarquia de conteudo

Sugestao de organizacao:

- `Academia`
- `Trilha`
- `Modulo`
- `Aula`
- `Bloco de aula`

Exemplo:

- Academia: `Tecnologia`
- Trilha: `Python`
- Modulo: `Flask APIs`
- Aula: `Criando rotas com Blueprints`
- Bloco: `video`, `texto`, `checklist`, `codigo`, `quiz`, `material extra`

### 4.2 Entidades principais

#### `users`

Responsavel pela identidade do usuario autenticado.

Campos sugeridos:

- `id`
- `name`
- `email`
- `avatar_url`
- `provider`
- `provider_account_id`
- `status`
- `created_at`
- `updated_at`

#### `roles`

Perfis de acesso.

Exemplos:

- `admin`
- `instrutor`
- `editor`
- `aluno`
- `convidado`

#### `user_roles`

Relaciona usuarios e papeis.

#### `tracks`

Representa a trilha principal.

Campos sugeridos:

- `id`
- `slug`
- `title`
- `description`
- `status`
- `visibility`
- `cover_image`
- `order_index`

#### `modules`

Agrupa aulas dentro de uma trilha.

Campos sugeridos:

- `id`
- `track_id`
- `slug`
- `title`
- `description`
- `status`
- `visibility`
- `order_index`

#### `lessons`

Representa a aula navegavel.

Campos sugeridos:

- `id`
- `module_id`
- `slug`
- `title`
- `summary`
- `lesson_type`
- `estimated_minutes`
- `status`
- `visibility`
- `order_index`

#### `lesson_blocks`

Permite que cada aula tenha blocos reutilizaveis.

Tipos de bloco:

- `rich_text`
- `code`
- `checklist`
- `image`
- `video`
- `quiz`
- `link_list`
- `download`
- `callout`

Campos sugeridos:

- `id`
- `lesson_id`
- `block_type`
- `content_json`
- `order_index`

#### `access_policies`

Tabela para definir regras de acesso.

Campos sugeridos:

- `id`
- `resource_type` (`track`, `module`, `lesson`)
- `resource_id`
- `policy_type`
- `policy_value`

Exemplos de regra:

- somente `admin` e `instrutor`
- somente usuarios com email de dominio interno
- liberar modulo apenas apos concluir anterior
- liberar por grupo especifico

#### `enrollments`

Vincula usuario ao conteudo liberado.

Campos sugeridos:

- `id`
- `user_id`
- `track_id`
- `status`
- `started_at`
- `completed_at`

#### `lesson_progress`

Guarda progresso por aula.

Campos sugeridos:

- `id`
- `user_id`
- `lesson_id`
- `progress_percent`
- `started_at`
- `last_seen_at`
- `completed_at`

#### `event_logs`

Tabela crua para eventos de uso.

Campos sugeridos:

- `id`
- `user_id`
- `session_id`
- `event_name`
- `resource_type`
- `resource_id`
- `metadata_json`
- `occurred_at`
- `device_type`
- `platform`

## 5. Controle de acesso

### 5.1 Niveis de acesso

Sugestao inicial simples e forte:

- `publico`: pode visualizar pagina institucional, sem acessar aula
- `autenticado`: pode acessar dashboard e catalogo liberado
- `aluno`: consome aulas liberadas
- `instrutor`: cria e revisa conteudo
- `editor`: organiza conteudo e publica
- `admin`: controla regras, usuarios, acessos e estatisticas

### 5.2 Regras que valem implementar cedo

1. Acesso ao dashboard apenas para usuario autenticado
2. Acesso a trilha por papel ou matricula
3. Acesso a modulo por ordem de liberacao
4. Acesso a aula por regra de progressao
5. Acesso administrativo separado do consumo do aluno

### 5.3 Estrategia recomendada

No frontend Next.js:

- proteger rotas e telas
- esconder navegacao que o usuario nao pode usar
- buscar permissoes ja resolvidas para renderizacao

Na API Flask:

- validar permissao de forma definitiva
- nunca confiar apenas no bloqueio visual do frontend

## 6. Arquitetura sugerida

### 6.1 Papel do Next.js

O Next.js fica responsavel por:

- autenticacao com `next-auth`
- renderizacao das telas
- experiencia do aluno e do admin
- consumo da API Flask
- dashboards visuais e navegacao

### 6.2 Papel do Flask

O Flask fica responsavel por:

- cadastro e consulta de trilhas, modulos e aulas
- regras de acesso e matriculas
- gravacao de eventos
- consolidacao de estatisticas
- API para painel administrativo

### 6.3 Integracao recomendada

Fluxo sugerido:

1. Usuario autentica no Next.js
2. Next resolve sessao e identifica usuario
3. Next chama API Flask com token interno ou chave de servico
4. Flask retorna catalogo permitido, progresso e estatisticas
5. Frontend renderiza a experiencia conforme o perfil

## 7. Estrutura de API Flask

### 7.1 Estrutura de projeto sugerida

```text
api/
  app/
    __init__.py
    config.py
    extensions.py
    models/
      user.py
      role.py
      track.py
      module.py
      lesson.py
      progress.py
      event_log.py
    routes/
      auth.py
      tracks.py
      modules.py
      lessons.py
      progress.py
      analytics.py
      admin.py
    services/
      access_service.py
      catalog_service.py
      progress_service.py
      analytics_service.py
    schemas/
      track_schema.py
      lesson_schema.py
      analytics_schema.py
    repositories/
      track_repository.py
      lesson_repository.py
      analytics_repository.py
  migrations/
  tests/
  run.py
```

### 7.2 Blueprints recomendados

- `GET /api/tracks`
- `GET /api/tracks/<slug>`
- `GET /api/modules/<slug>`
- `GET /api/lessons/<slug>`
- `POST /api/progress/lesson-view`
- `POST /api/progress/lesson-complete`
- `POST /api/events`
- `GET /api/analytics/overview`
- `GET /api/analytics/tracks/<slug>`
- `GET /api/admin/access-policies`
- `POST /api/admin/access-policies`

### 7.3 Evento minimo para estatisticas

Payload base sugerido para `POST /api/events`:

```json
{
  "event_name": "lesson_view",
  "user_id": "uuid-do-usuario",
  "resource_type": "lesson",
  "resource_id": "uuid-da-aula",
  "session_id": "sessao-ou-request-id",
  "device_type": "mobile",
  "platform": "web",
  "metadata": {
    "track_slug": "python",
    "module_slug": "flask",
    "lesson_slug": "introducao-flask"
  }
}
```

## 8. Estatisticas que valem desde o inicio

Comecar pequeno e certo e melhor do que tentar medir tudo.

### 8.1 Metricas iniciais

- usuarios ativos por dia
- usuarios ativos por semana
- aulas mais acessadas
- taxa de conclusao por aula
- taxa de conclusao por modulo
- tempo medio entre inicio e conclusao
- abandono por etapa
- acessos por tipo de dispositivo
- trilhas com maior engajamento

### 8.2 Eventos iniciais recomendados

- `login_success`
- `dashboard_view`
- `track_view`
- `module_view`
- `lesson_view`
- `lesson_block_view`
- `lesson_complete`
- `quiz_answered`
- `material_downloaded`
- `search_used`

### 8.3 Cuidados importantes

- evitar gravar dados sensiveis sem necessidade
- anonimizar quando a metrica nao precisar identificar a pessoa
- registrar horario, origem e dispositivo
- padronizar nomes dos eventos desde o inicio

## 9. Estrategia de conteudo escalavel

Para suportar muitos treinamentos, o conteudo nao deve nascer preso a componentes fixos por linguagem.

### 9.1 O que evitar

- uma pagina hardcoded para cada aula
- textos presos dentro de componentes React sem modelo de dados
- regras de acesso espalhadas por paginas

### 9.2 O que fazer

- mover catalogo para modelo de dados
- representar aula por blocos renderizaveis
- usar `slug` estavel para trilhas, modulos e aulas
- publicar e versionar conteudo por status

### 9.3 Status sugeridos

- `rascunho`
- `em_revisao`
- `publicado`
- `arquivado`

## 10. Experiencia para notebook, desktop e mobile

### 10.1 Principios

- navegacao clara por trilha > modulo > aula
- progresso sempre visivel
- leitura confortavel em tela pequena
- retorno rapido para o ponto onde o usuario parou

### 10.2 Requisitos de interface

- menu lateral no desktop
- seletor horizontal ou drawer no mobile
- cards responsivos para trilhas e modulos
- leitura em blocos curtos e escaneaveis
- CTA claros para `continuar`, `concluir`, `proxima aula`

### 10.3 Itens importantes para a API

A API deve ajudar a interface com:

- progresso por usuario
- ultima aula acessada
- proximas aulas liberadas
- bloqueios por permissao
- contagem consolidada para dashboards

## 11. Roadmap evolutivo por fases

### Fase 1 - Organizar a base atual

Objetivo: sair do modelo visual inicial para um modelo de dominio.

Entregas:

- manter o login atual com `next-auth`
- criar documento de dominio para `trilhas`, `modulos`, `aulas` e `blocos`
- refatorar `module-catalog` para um formato mais proximo de dados persistiveis
- mapear o que hoje e fixo em componentes e o que precisa virar dado

### Fase 2 - Definir persistencia

Objetivo: permitir criar muito conteudo sem depender de codigo manual.

Entregas:

- criar banco para trilhas, modulos, aulas e progresso
- criar seeds iniciais para `Next.js`, `Django` e `Flask`
- associar usuarios a papeis e matriculas

### Fase 3 - Subir a API Flask

Objetivo: separar regras de negocio e preparar integracao modular.

Entregas:

- iniciar projeto Flask com Blueprints
- criar endpoints de catalogo
- criar endpoints de progresso
- criar endpoint de eventos
- validar autenticacao entre Next e Flask

### Fase 4 - Liberacao por acesso

Objetivo: controlar quem acessa o que.

Entregas:

- RBAC com `roles`
- matricula por trilha
- bloqueio de modulo por sequencia
- acesso administrativo separado

### Fase 5 - Estatisticas operacionais

Objetivo: transformar uso em informacao de decisao.

Entregas:

- gravar eventos padronizados
- criar consolidacao diaria
- exibir painel com metricas principais
- medir consumo por trilha, modulo, aula e dispositivo

### Fase 6 - Gestao de conteudo

Objetivo: permitir evoluir treinamento continuamente.

Entregas:

- painel admin para criar trilhas, modulos e aulas
- editor por blocos
- workflow de rascunho, revisao e publicacao
- versao de conteudo para manter historico

## 12. Ordem tecnica recomendada

Para reduzir risco e ganhar valor rapido, a ordem mais segura e:

1. consolidar o modelo de dados
2. definir regras de acesso
3. criar API Flask minima
4. instrumentar eventos
5. exibir estatisticas
6. criar painel administrativo

## 13. Primeira versao minima viavel

Uma V1 enxuta ja entregaria muito valor se tiver:

- login com Google no Next.js
- dashboard com trilhas liberadas por usuario
- API Flask com `tracks`, `modules`, `lessons` e `events`
- progresso por aula
- estatisticas basicas de acesso e conclusao
- layout responsivo para notebook, desktop e mobile

## 14. Sugestao de proximos arquivos

Depois deste plano, os proximos documentos uteis seriam:

- `docs/arquitetura-conteudo.md`
- `docs/modelo-dados.md`
- `docs/api-flask.md`
- `docs/eventos-analytics.md`
- `docs/regras-acesso.md`

## 15. Recomendacao pratica para esta base

Como o projeto ja possui trilhas visuais e autenticacao funcionando, a melhor estrategia agora e:

1. nao reescrever a interface atual
2. transformar a estrutura atual em um catalogo orientado a dados
3. usar Flask como backend de conteudo e estatisticas
4. manter o Next.js como camada de autenticacao e experiencia
5. liberar o crescimento por trilhas sem duplicar paginas manualmente

## 16. Resultado esperado

Quando este plano estiver maduro, voces terao:

- uma base autenticada e modular
- controle de acesso por perfil e progresso
- muitos treinamentos convivendo na mesma plataforma
- conteudo evolutivo sem depender de pages hardcoded
- estatisticas reais para medir uso, conclusao e valor do projeto

