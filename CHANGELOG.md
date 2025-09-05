# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-01-04

### Adicionado
- Sistema completo de autenticação JWT
- Sistema de autorização baseado em roles (ADMIN, EDITOR, WRITER, READER)
- Controle de permissões avançado com CASL
- CRUD completo para usuários com validação de permissões
- CRUD completo para posts com controle de autorização
- Validação de dados robusta com DTOs
- Tratamento de erros HTTP consistente
- Configuração flexível com variáveis de ambiente
- Integração com PostgreSQL via Prisma ORM
- Criptografia de senhas com bcrypt
- Docker Compose para banco de dados
- Dockerfile para produção
- GitHub Actions para CI/CD
- Sistema de seeds para dados iniciais
- Documentação completa com README detalhado
- Configuração de linting e formatação
- Arquivos de configuração para VS Code
- Licença MIT

### Funcionalidades
- **Autenticação**: Login com JWT tokens
- **Autorização**: Controle de acesso baseado em roles
- **Usuários**: CRUD completo com permissões
- **Posts**: CRUD completo com controle de autorização
- **Segurança**: Senhas criptografadas, validação de tokens
- **API**: Endpoints RESTful bem documentados
- **Deploy**: Configuração Docker para produção

### Tecnologias
- NestJS 11.x
- Prisma 6.x
- PostgreSQL 16.x
- CASL para autorização
- JWT para autenticação
- bcrypt para criptografia
- Docker para containerização
- GitHub Actions para CI/CD

### Documentação
- README completo com instruções de instalação
- Exemplos de uso da API
- Documentação de roles e permissões
- Guia de configuração de ambiente
- Instruções para publicação no GitHub
- Arquivos de configuração para desenvolvimento

---

## Próximas Versões

### [1.1.0] - Planejado
- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] Logs estruturados
- [ ] Métricas de performance
- [ ] Cache com Redis
- [ ] Upload de arquivos
- [ ] Notificações por email

### [1.2.0] - Planejado
- [ ] Autenticação social (Google, GitHub)
- [ ] 2FA (Two-Factor Authentication)
- [ ] Auditoria de ações
- [ ] Dashboard administrativo
- [ ] API GraphQL
- [ ] WebSockets para real-time

### [2.0.0] - Planejado
- [ ] Microserviços
- [ ] Kubernetes
- [ ] Service mesh
- [ ] Event sourcing
- [ ] CQRS pattern
