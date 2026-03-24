# Planejamento da API de cursos

## 1. Objetivo

Este documento define o planejamento inicial da pasta `curso-api`, que sera a base da nossa API em Python Flask para:

- controlar acesso aos cursos, trilhas, modulos e aulas
- registrar progresso dos usuarios
- gravar eventos para estatisticas
- apoiar a evolucao do painel administrativo
- servir dados para o frontend em Next.js

Neste momento, o foco e planejamento. Ainda nao estamos implementando a API, mas preparando uma estrutura recomendada para crescer de forma modular.

## 2. Papel da API no projeto

A API Flask ficara responsavel por 4 blocos principais:

1. `catalogo de conteudo`
2. `controle de acesso`
3. `progresso do aluno`
4. `eventos e estatisticas`

O Next.js continua responsavel por:

- login com `next-auth`
- experiencia visual
- dashboard
- consumo dos endpoints

## 3. Estrutura recomendada da pasta

Sugestao de organizacao para a futura implementacao:

```text
curso-api/
  app/
    __init__.py
    config.py
    extensions.py
    models/
      user.py
      role.py
      user_role.py
      track.py
      module.py
      lesson.py
      lesson_block.py
      enrollment.py
      lesson_progress.py
      access_policy.py
      event_log.py
    routes/
      health.py
      tracks.py
      modules.py
      lessons.py
      progress.py
      events.py
      analytics.py
      admin.py
    services/
      access_service.py
      track_service.py
      lesson_service.py
      progress_service.py
      analytics_service.py
      event_service.py
    repositories/
      user_repository.py
      track_repository.py
      lesson_repository.py
      analytics_repository.py
    schemas/
      track_schema.py
      lesson_schema.py
      progress_schema.py
      analytics_schema.py
  migrations/
  tests/
  requirements.txt
  run.py
  planejamento.md
```

## 4. Principios da arquitetura

### 4.1 Separacao de responsabilidades

Cada camada deve ter um papel claro:

- `routes`: recebe requisicoes HTTP
- `services`: aplica regras de negocio
- `repositories`: consulta e grava dados
- `models`: representa tabelas e relacionamentos
- `schemas`: valida entrada e padroniza saida

### 4.2 Crescimento modular

A API deve permitir:

- adicionar novas trilhas sem alterar a estrutura central
- liberar novos tipos de aula
- criar novas regras de acesso
- ampliar relatorios sem quebrar o catalogo

### 4.3 Seguranca

A API deve validar:

- quem e o usuario autenticado
- quais recursos ele pode acessar
- quais endpoints sao administrativos
- quais eventos podem ser gravados

## 5. Endpoints principais

Abaixo esta a primeira lista de endpoints importantes para a V1 e para as fases seguintes.

## 5.1 Health check

### `GET /api/health`

Objetivo:

- validar se a API esta online

Resposta esperada:

```json
{
  "status": "ok",
  "service": "curso-api"
}
```

## 5.2 Catalogo de trilhas

### `GET /api/tracks`

Objetivo:

- listar trilhas disponiveis para o usuario

Uso:

- alimentar dashboard principal
- exibir trilhas liberadas por perfil ou matricula

Campos de resposta sugeridos:

- `id`
- `slug`
- `title`
- `description`
- `status`
- `visibility`
- `cover_image`
- `progress_summary`

### `GET /api/tracks/<slug>`

Objetivo:

- trazer detalhes de uma trilha especifica

Uso:

- pagina interna da trilha
- listar modulos da trilha
- mostrar progresso agregado

Resposta sugerida:

- dados da trilha
- modulos vinculados
- total de aulas
- percentual concluido
- proxima aula liberada

## 5.3 Catalogo de modulos

### `GET /api/modules/<slug>`

Objetivo:

- detalhar um modulo

Uso:

- listar aulas do modulo
- informar bloqueios ou liberacoes

Resposta sugerida:

- dados do modulo
- aulas ordenadas
- status de acesso por aula
- progresso do usuario no modulo

## 5.4 Catalogo de aulas

### `GET /api/lessons/<slug>`

Objetivo:

- buscar uma aula completa com seus blocos

Uso:

- renderizar pagina da aula
- carregar textos, codigos, videos, checklists e outros blocos

Resposta sugerida:

- dados da aula
- blocos ordenados
- regra de navegacao
- status de progresso
- aula anterior e proxima aula

## 5.5 Progresso do usuario

### `POST /api/progress/lesson-view`

Objetivo:

- registrar que o usuario abriu uma aula

Payload sugerido:

```json
{
  "lesson_id": "uuid-da-aula",
  "track_slug": "python",
  "module_slug": "flask"
}
```

### `POST /api/progress/lesson-complete`

Objetivo:

- marcar aula como concluida

Payload sugerido:

```json
{
  "lesson_id": "uuid-da-aula"
}
```

### `GET /api/progress/me`

Objetivo:

- consultar progresso geral do usuario autenticado

Uso:

- dashboard pessoal
- retomada automatica de estudo

Resposta sugerida:

- trilhas em andamento
- modulos concluidos
- aulas concluidas
- ultima aula acessada

## 5.6 Eventos e telemetria

### `POST /api/events`

Objetivo:

- gravar eventos de navegacao e consumo

Eventos iniciais sugeridos:

- `dashboard_view`
- `track_view`
- `module_view`
- `lesson_view`
- `lesson_complete`
- `material_downloaded`
- `quiz_answered`

Payload base sugerido:

```json
{
  "event_name": "lesson_view",
  "resource_type": "lesson",
  "resource_id": "uuid-da-aula",
  "session_id": "session-id",
  "device_type": "mobile",
  "platform": "web",
  "metadata": {
    "track_slug": "python",
    "module_slug": "flask",
    "lesson_slug": "introducao-flask"
  }
}
```

## 5.7 Analytics

### `GET /api/analytics/overview`

Objetivo:

- retornar metricas consolidadas para o painel

Metricas iniciais:

- usuarios ativos
- trilhas mais acessadas
- aulas mais acessadas
- taxa de conclusao
- acessos por dispositivo

### `GET /api/analytics/tracks/<slug>`

Objetivo:

- detalhar metricas de uma trilha especifica

Resposta sugerida:

- total de acessos
- total de usuarios
- modulos mais acessados
- aulas com maior abandono
- conclusao por modulo

## 5.8 Administracao

### `GET /api/admin/access-policies`

Objetivo:

- listar regras de acesso cadastradas

### `POST /api/admin/access-policies`

Objetivo:

- criar uma nova regra de acesso

### `GET /api/admin/users`

Objetivo:

- listar usuarios e perfis

### `POST /api/admin/enrollments`

Objetivo:

- vincular usuario a trilha ou permissao

## 6. Tabelas futuras

Aqui esta a modelagem recomendada para o banco de dados da API.

## 6.1 `users`

Objetivo:

- armazenar os dados principais do usuario autenticado

Campos sugeridos:

- `id` - identificador unico
- `name` - nome do usuario
- `email` - email unico
- `avatar_url` - foto do perfil
- `provider` - origem de autenticacao, como Google
- `provider_account_id` - id externo do provedor
- `status` - ativo, bloqueado, convidado
- `created_at`
- `updated_at`

Observacoes:

- essa tabela permite sincronizar o usuario autenticado no frontend com o backend Flask

## 6.2 `roles`

Objetivo:

- definir os perfis da plataforma

Campos sugeridos:

- `id`
- `name` - admin, instrutor, editor, aluno
- `description`
- `created_at`
- `updated_at`

## 6.3 `user_roles`

Objetivo:

- relacionar usuario com um ou mais perfis

Campos sugeridos:

- `id`
- `user_id`
- `role_id`
- `created_at`

Observacoes:

- importante para permitir usuarios com mais de um papel

## 6.4 `tracks`

Objetivo:

- representar trilhas principais de conteudo

Campos sugeridos:

- `id`
- `slug`
- `title`
- `description`
- `short_description`
- `status` - rascunho, publicado, arquivado
- `visibility` - publico, autenticado, restrito
- `cover_image`
- `order_index`
- `created_by`
- `created_at`
- `updated_at`

Observacoes:

- equivalente ao primeiro nivel do catalogo
- exemplo: `Next.js`, `Python`, `Java`

## 6.5 `modules`

Objetivo:

- organizar o conteudo dentro de uma trilha

Campos sugeridos:

- `id`
- `track_id`
- `slug`
- `title`
- `description`
- `status`
- `visibility`
- `order_index`
- `estimated_minutes`
- `created_at`
- `updated_at`

Observacoes:

- uma trilha pode ter muitos modulos
- exemplo: dentro de `Python`, o modulo `Flask APIs`

## 6.6 `lessons`

Objetivo:

- representar cada aula navegavel

Campos sugeridos:

- `id`
- `module_id`
- `slug`
- `title`
- `summary`
- `lesson_type` - texto, video, pratica, quiz
- `status`
- `visibility`
- `estimated_minutes`
- `order_index`
- `is_free_preview`
- `created_at`
- `updated_at`

Observacoes:

- uma aula sempre pertence a um modulo
- a interface pode montar navegacao por ordem

## 6.7 `lesson_blocks`

Objetivo:

- permitir que a aula seja composta por blocos flexiveis

Campos sugeridos:

- `id`
- `lesson_id`
- `block_type`
- `title`
- `content_json`
- `order_index`
- `created_at`
- `updated_at`

Tipos de bloco sugeridos:

- `rich_text`
- `code`
- `checklist`
- `image`
- `video`
- `quiz`
- `callout`
- `link_list`
- `download`

Observacoes:

- essa tabela evita criar um componente fixo para cada tipo de aula
- ajuda a escalar o catalogo com muitos treinamentos

## 6.8 `enrollments`

Objetivo:

- registrar matricula ou liberacao do usuario em uma trilha

Campos sugeridos:

- `id`
- `user_id`
- `track_id`
- `status` - ativa, pausada, concluida, cancelada
- `started_at`
- `completed_at`
- `created_at`
- `updated_at`

Observacoes:

- permite liberar trilhas apenas para grupos especificos

## 6.9 `lesson_progress`

Objetivo:

- guardar progresso individual por aula

Campos sugeridos:

- `id`
- `user_id`
- `lesson_id`
- `progress_percent`
- `started_at`
- `last_seen_at`
- `completed_at`
- `created_at`
- `updated_at`

Observacoes:

- importante para retomada de estudo e dashboards pessoais

## 6.10 `access_policies`

Objetivo:

- centralizar regras de acesso por recurso

Campos sugeridos:

- `id`
- `resource_type` - track, module, lesson
- `resource_id`
- `policy_type` - role_required, enrollment_required, previous_completion
- `policy_value`
- `created_at`
- `updated_at`

Observacoes:

- essa tabela ajuda a evitar regra espalhada no codigo
- a validacao deve acontecer no backend

## 6.11 `event_logs`

Objetivo:

- armazenar eventos brutos para estatisticas

Campos sugeridos:

- `id`
- `user_id`
- `session_id`
- `event_name`
- `resource_type`
- `resource_id`
- `device_type`
- `platform`
- `metadata_json`
- `occurred_at`
- `created_at`

Observacoes:

- base para analytics e leitura de comportamento
- manter o nome dos eventos padronizado desde o inicio

## 6.12 `analytics_daily`

Objetivo:

- armazenar consolidacoes diarias para consultas rapidas

Campos sugeridos:

- `id`
- `reference_date`
- `metric_name`
- `resource_type`
- `resource_id`
- `metric_value`
- `metadata_json`
- `created_at`

Observacoes:

- opcional no inicio, mas recomendada para relatorios maiores

## 7. Relacionamentos principais

Visao resumida:

- um `user` pode ter varios `roles`
- uma `track` tem varios `modules`
- um `module` tem varias `lessons`
- uma `lesson` tem varios `lesson_blocks`
- um `user` pode ter varias `enrollments`
- um `user` pode ter varios registros em `lesson_progress`
- um `user` pode gerar varios `event_logs`

## 8. Ordem recomendada de implementacao

Para reduzir risco, a melhor ordem e:

1. criar `health`
2. criar `users`, `roles` e `user_roles`
3. criar `tracks`, `modules`, `lessons` e `lesson_blocks`
4. criar `enrollments` e `lesson_progress`
5. criar `event_logs`
6. criar endpoints de analytics
7. criar endpoints administrativos

## 9. MVP recomendado

A primeira versao da API pode nascer com:

- `GET /api/health`
- `GET /api/tracks`
- `GET /api/tracks/<slug>`
- `GET /api/modules/<slug>`
- `GET /api/lessons/<slug>`
- `POST /api/progress/lesson-view`
- `POST /api/progress/lesson-complete`
- `POST /api/events`

Tabelas minimas para essa fase:

- `users`
- `roles`
- `user_roles`
- `tracks`
- `modules`
- `lessons`
- `lesson_blocks`
- `lesson_progress`
- `event_logs`

## 10. Resultado esperado

Com essa estrutura, a pasta `curso-api` fica preparada para:

- crescer com muitos treinamentos
- controlar acesso por perfil e progressao
- atender o frontend Next.js de forma limpa
- gerar estatisticas reais de uso
- evoluir depois para painel administrativo sem retrabalho grande
