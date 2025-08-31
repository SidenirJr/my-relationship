# Nossa História - Aplicação Web Romântica

Uma aplicação web completa para casais compartilharem suas memórias através de fotos e histórias. Desenvolvida com React/TypeScript no frontend e Node.js/Express no backend.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **Shadcn/ui** para componentes
- **React Router** para navegação
- **React Query** para gerenciamento de estado
- **React Quill** para editor de texto rico
- **Lucide React** para ícones

### Backend
- **Node.js** com TypeScript
- **Express.js** como framework web
- **Prisma** como ORM
- **MySQL** como banco de dados
- **Redis** para cache e sessões
- **JWT** para autenticação
- **Multer** para upload de arquivos
- **bcrypt** para hash de senhas

### DevOps
- **Docker** e **Docker Compose**
- **Nginx** como proxy reverso
- **ESLint** e **Prettier** para qualidade de código

## 📋 Pré-requisitos

- Node.js 18+ 
- Docker e Docker Compose
- Git

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd sideludi
```

### 2. Configuração com Docker (Recomendado)

```bash
# Inicie todos os serviços
docker compose up -d

# Aguarde alguns segundos para os serviços iniciarem
# Execute as migrações do banco
docker compose exec backend npx prisma migrate deploy

# (Opcional) Execute o seed para dados iniciais
docker compose exec backend npx prisma db seed
```

### 3. Configuração Manual (Desenvolvimento)

#### Backend
```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute as migrações
npx prisma migrate deploy

# (Opcional) Execute o seed
npx prisma db seed

# Inicie o servidor de desenvolvimento
npm run dev
```

#### Frontend
```bash
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

## 📁 Estrutura do Projeto

```
sideludi/
├── backend/                 # API Backend
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── middlewares/     # Middlewares personalizados
│   │   ├── routes/          # Definição das rotas
│   │   └── index.ts         # Arquivo principal
│   ├── prisma/
│   │   ├── schema.prisma    # Schema do banco de dados
│   │   └── seed.ts          # Dados iniciais
│   ├── uploads/             # Arquivos enviados
│   └── Dockerfile
├── frontend/                # Interface do usuário
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── contexts/        # Contextos React
│   │   ├── services/        # Serviços de API
│   │   └── styles/          # Estilos personalizados
│   └── Dockerfile
└── docker-compose.yml       # Configuração dos serviços
```

## 🔐 Sistema de Autenticação

### Endpoints de Autenticação

#### POST `/api/auth/login`
Realiza login do usuário

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário"
  },
  "token": "jwt_token_aqui"
}
```

#### POST `/api/auth/logout`
Realiza logout do usuário

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

#### GET `/api/auth/me`
Retorna informações do usuário autenticado

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "id": 1,
  "email": "usuario@email.com",
  "name": "Nome do Usuário"
}
```

## 📸 API de Fotos

### Endpoints de Fotos

#### GET `/api/photos`
Retorna todas as seções de fotos

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Primeira vez que nos encontramos",
    "description": "Primeira vez que nos encontramos - Foto",
    "photos": [
      {
        "id": 1,
        "title": "Nosso primeiro encontro",
        "description": "Uma foto especial",
        "url": "/uploads/photo-123.jpg",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
]
```

#### POST `/api/photos/sections`
Cria uma nova seção de fotos (requer autenticação)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "title": "Nova Seção",
  "description": "Descrição da seção"
}
```

#### PUT `/api/photos/sections/:id`
Atualiza uma seção de fotos (requer autenticação)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "title": "Título Atualizado",
  "description": "Nova descrição"
}
```

#### DELETE `/api/photos/sections/:id`
Exclui uma seção de fotos (requer autenticação)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### POST `/api/photos/sections/:sectionId/photos`
Adiciona uma foto à seção (requer autenticação)

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body (FormData):**
- `file`: Arquivo da imagem
- `title`: Título da foto
- `description`: Descrição da foto

#### PUT `/api/photos/:id`
Atualiza informações de uma foto (requer autenticação)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "title": "Novo título",
  "description": "Nova descrição"
}
```

#### DELETE `/api/photos/:id`
Exclui uma foto (requer autenticação)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## 📖 API de História

### Endpoints de História

#### GET `/api/story`
Retorna o conteúdo da história

**Response (200):**
```json
{
  "id": 1,
  "content": "<p>Nossa história começou...</p>",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### PUT `/api/story`
Atualiza o conteúdo da história (requer autenticação)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "content": "<p>Conteúdo HTML da história...</p>"
}
```

## 🎨 Frontend - Páginas e Funcionalidades

### Páginas Principais

1. **Home (`/`)** - Página inicial com apresentação
2. **Fotos (`/fotos`)** - Galeria de fotos organizadas por seções
3. **História (`/historia`)** - Página com a história do casal
4. **Login (`/login`)** - Página de autenticação

### Funcionalidades por Página

#### Página de Fotos
- **Visualização pública**: Galeria responsiva com lightbox
- **Modo autenticado**:
  - Adicionar novas seções
  - Upload de fotos com drag & drop
  - Editar títulos e descrições
  - Excluir fotos e seções
  - Reorganizar conteúdo

#### Página de História
- **Visualização pública**: Leitura da história formatada
- **Modo autenticado**:
  - Editor de texto rico (ReactQuill)
  - Formatação: negrito, itálico, listas, links
  - Salvamento automático
  - Preview em tempo real

#### Sistema de Navegação
- Menu responsivo com hamburger no mobile
- Botão de logout quando autenticado
- Indicação visual da página ativa
- Transições suaves entre páginas

### Componentes Principais

- **Navigation**: Barra de navegação responsiva
- **Layout**: Layout base com navegação
- **AuthContext**: Gerenciamento de estado de autenticação
- **PhotoUpload**: Componente de upload de fotos
- **RichTextEditor**: Editor de texto com formatação

## 🗄️ Banco de Dados

### Modelos de Dados

#### User
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### PhotoSection
```prisma
model PhotoSection {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
  photos      Photo[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Photo
```prisma
model Photo {
  id          Int          @id @default(autoincrement())
  title       String
  description String?
  url         String
  section     PhotoSection @relation(fields: [sectionId], references: [id])
  sectionId   Int
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}
```

#### Story
```prisma
model Story {
  id        Int      @id @default(autoincrement())
  content   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 Configuração de Ambiente

### Backend (.env)
```env
# Banco de dados
DATABASE_URL="mysql://user:password@localhost:3306/sideludi"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="seu_jwt_secret_muito_seguro"
JWT_EXPIRES_IN="7d"

# Servidor
PORT=3001
NODE_ENV="development"

# Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=5242880  # 5MB
```

### Frontend (.env)
```env
# API Base URL
VITE_API_BASE_URL="http://localhost:3001"

# Outras configurações
VITE_APP_NAME="Nossa História"
```

## 🚀 Deploy

### Usando Docker Compose (Produção)

1. Configure as variáveis de ambiente para produção
2. Execute:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Deploy Manual

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
# Sirva os arquivos da pasta dist com nginx ou outro servidor
```

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📝 Scripts Disponíveis

### Backend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila TypeScript
- `npm start` - Inicia servidor de produção
- `npm test` - Executa testes
- `npm run prisma:migrate` - Executa migrações
- `npm run prisma:seed` - Executa seed do banco

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm test` - Executa testes
- `npm run lint` - Executa linter

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todos os serviços estão rodando
2. Confira os logs: `docker-compose logs`
3. Verifique as variáveis de ambiente
4. Consulte a documentação da API

**Desenvolvido com ❤️ para Ludimila**