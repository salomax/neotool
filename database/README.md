
# Database

- **Primário**: PostgreSQL (ver `infra/docker/docker-compose.local.yml`).
- **Migrations**: Flyway (rodadas pelo backend `service/app` ao subir).
- **ORM**: JPA/Hibernate.

Tabelas iniciais: users, roles, permissions (+ junções).
