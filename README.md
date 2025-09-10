
# Invistus – Full‑stack Starter

Monorepo contendo **web**, **mobile**, **backend**, **database**, **observability**, **cicd** e **docs**.

> **Stack**  
> - Web: Next.js (App Router), TypeScript, Material UI, Zustand, react-hook-form + Zod, i18n (en-US/pt-BR), Vitest, Playwright, Storybook  
> - Mobile: Expo + React Native, expo-router, OTA via `expo-updates`, Jest, Detox, i18n (en-US/pt-BR)  
> - Backend: Kotlin + Micronaut, GraphQL, Auth Google OAuth (JWT), RBAC, JPA/Hibernate, Flyway, Redis, Kafka  
> - Observability: Prometheus (metrics), Loki + Promtail (logs), Tempo + OTEL Collector (traces), Grafana dashboards, Sentry hooks  
> - DevOps: Docker, Docker Compose (local), GitHub Actions (build/test/deploy), ArgoCD (GitOps), Terraform (esqueleto)  
> - Registry: GHCR  
> - Docs: Docusaurus, ADR (adr-tools), Mermaid

## Rodando local (Docker Compose)
1. Copie `.env.example` para `.env` e ajuste credenciais.
2. Execute:
   ```bash
   docker compose -f infra/docker/docker-compose.local.yml up -d --build
   ```
3. Acesse:
   - Web: http://localhost:3000
   - Backend (GraphQL): http://localhost:8080/graphql
   - Grafana: http://localhost:3001 (login admin/admin – mude depois)
   - Prometheus: http://localhost:9090
   - Tempo UI (via Grafana): http://localhost:3001
   - Loki (API): http://localhost:3100

> **Nota**: este é um **esqueleto** inicial para acelerar. Alguns pontos exigem ajustes (chaves OAuth, DSN Sentry, etc.).
