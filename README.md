# NestJS Authentication & Authorization System

Um sistema completo de autenticação e autorização construído com NestJS, Prisma, PostgreSQL e CASL para controle de permissões baseado em roles.

## 🚀 Funcionalidades

- **Autenticação JWT**: Sistema de login seguro com tokens JWT
- **Autorização por Roles**: Controle de acesso baseado em roles (ADMIN, EDITOR, WRITER, READER)
- **Controle de Permissões**: Sistema avançado de permissões usando CASL
- **CRUD de Usuários**: Gerenciamento completo de usuários
- **CRUD de Posts**: Sistema de posts com controle de autorização
- **Validação de Dados**: Validação robusta com DTOs
- **Tratamento de Erros**: Tratamento consistente de erros HTTP
- **Variáveis de Ambiente**: Configuração flexível via variáveis de ambiente

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js para aplicações escaláveis
- **Prisma** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional
- **CASL** - Biblioteca para controle de permissões
- **JWT** - Autenticação baseada em tokens
- **bcrypt** - Criptografia de senhas
- **Docker** - Containerização do banco de dados

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker e Docker Compose
- Git

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nestjs-auth.git
cd nestjs-auth
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://postgres:root@localhost:5432/mydb?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="2h"

# Application
PORT=3000
NODE_ENV="development"
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

### 6. Gere o cliente Prisma

```bash
npx prisma generate
```

### 7. Inicie a aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📚 Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
│   ├── auth.controller.ts
│   ├── auth.guard.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── login.dto.ts
│   ├── required-roles.decorator.ts
│   └── role/
│       └── role.guard.ts
├── casl/                # Sistema de permissões
│   ├── casl.module.ts
│   └── casl-ability/
│       └── casl-ability.service.ts
├── posts/               # Módulo de posts
│   ├── dto/
│   ├── entities/
│   ├── posts.controller.ts
│   ├── posts.module.ts
│   └── posts.service.ts
├── prisma/              # Configuração do Prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── users/               # Módulo de usuários
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## 🔐 Sistema de Roles e Permissões

### Roles Disponíveis

- **ADMIN**: Acesso total ao sistema
- **EDITOR**: Pode ler tudo e editar/criar posts próprios
- **WRITER**: Pode ler tudo e editar/criar posts próprios
- **READER**: Apenas leitura

### Permissões por Role

| Ação | ADMIN | EDITOR | WRITER | READER |
|------|-------|--------|--------|--------|
| Gerenciar usuários | ✅ | ❌ | ❌ | ❌ |
| Ler usuários | ✅ | ❌ | ❌ | ❌ |
| Criar posts | ✅ | ✅ | ✅ | ❌ |
| Ler posts | ✅ | ✅ | ✅ | ✅ |
| Editar posts próprios | ✅ | ✅ | ✅ | ❌ |
| Deletar posts próprios | ✅ | ✅ | ✅ | ❌ |

## 📡 API Endpoints

### Autenticação

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Usuários (Requer autenticação ADMIN)

```http
GET    /users          # Listar todos os usuários
POST   /users          # Criar novo usuário
GET    /users/:id      # Buscar usuário por ID
PATCH  /users/:id      # Atualizar usuário
DELETE /users/:id      # Deletar usuário
```

### Posts (Requer autenticação)

```http
GET    /posts          # Listar posts
POST   /posts          # Criar novo post
GET    /posts/:id      # Buscar post por ID
PATCH  /posts/:id      # Atualizar post
DELETE /posts/:id      # Deletar post
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build para produção
npm run build

# Executar em produção
npm run start:prod

# Executar testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes E2E
npm run test:e2e

# Linting
npm run lint

# Formatação de código
npm run format
```

## 🐳 Docker

O projeto inclui configuração Docker para o banco de dados PostgreSQL:

```bash
# Iniciar o banco de dados
docker-compose up -d

# Parar o banco de dados
docker-compose down
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes com coverage
npm run test:cov

# Executar testes E2E
npm run test:e2e
```

## 📝 Exemplos de Uso

### 1. Login e obtenção do token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 2. Criar um usuário (requer token ADMIN)

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "password123",
    "role": "WRITER"
  }'
```

### 3. Criar um post

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Meu Primeiro Post",
    "content": "Conteúdo do post...",
    "published": true,
    "authorId": "user-id-here"
  }'
```

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- Tokens JWT com expiração configurável
- Validação de dados com DTOs
- Controle de acesso baseado em roles
- Headers de segurança configurados

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-production-secret-key"
JWT_EXPIRES_IN="1h"
NODE_ENV="production"
PORT=3000
```

### Build para Produção

```bash
npm run build
npm run start:prod
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@gabrielgrm](https://github.com/gabrielgrm)
- LinkedIn: [grmgabriel](https://www.linkedin.com/in/grmgabriel/)

## 🙏 Agradecimentos

- [NestJS](https://nestjs.com/) - Framework incrível para Node.js
- [Prisma](https://www.prisma.io/) - ORM moderno e poderoso
- [CASL](https://casl.js.org/) - Sistema de autorização flexível
- Comunidade NestJS por toda a documentação e suporte

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!