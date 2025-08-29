# Backend - Nossa História API

API REST desenvolvida em Node.js/TypeScript para gerenciar fotos e histórias de casais.

## 🏗️ Arquitetura

### Estrutura de Pastas
```
backend/
├── src/
│   ├── controllers/         # Lógica de negócio
│   │   ├── auth.controller.ts
│   │   ├── photo.controller.ts
│   │   └── story.controller.ts
│   ├── middlewares/         # Middlewares personalizados
│   │   ├── auth.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/              # Definição das rotas
│   │   ├── auth.routes.ts
│   │   ├── photo.routes.ts
│   │   └── story.routes.ts
│   └── index.ts             # Arquivo principal
├── prisma/
│   ├── schema.prisma        # Schema do banco
│   └── seed.ts              # Dados iniciais
├── uploads/                 # Arquivos enviados
└── dist/                    # Código compilado
```

## 🔧 Configuração

### Variáveis de Ambiente
```env
# Banco de dados MySQL
DATABASE_URL="mysql://usuario:senha@localhost:3306/sideludi"

# Redis para sessões
REDIS_URL="redis://localhost:6379"

# JWT Authentication
JWT_SECRET="chave_secreta_muito_segura_aqui"
JWT_EXPIRES_IN="7d"

# Configurações do servidor
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:8080"

# Upload de arquivos
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=5242880  # 5MB em bytes
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/svg+xml"
```

### Instalação
```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate deploy
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📊 Banco de Dados

### Schema Prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // Hash bcrypt
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model PhotoSection {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255)
  description String?  @db.Text
  photos      Photo[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("photo_sections")
}

model Photo {
  id          Int          @id @default(autoincrement())
  title       String       @db.VarChar(255)
  description String?      @db.Text
  url         String       @db.VarChar(500)
  filename    String       @db.VarChar(255)
  mimetype    String       @db.VarChar(100)
  size        Int
  section     PhotoSection @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  sectionId   Int
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@map("photos")
}

model Story {
  id        Int      @id @default(autoincrement())
  content   String   @db.LongText
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("stories")
}
```

## 🛣️ Rotas da API

### Autenticação (`/api/auth`)

#### `POST /api/auth/login`
**Descrição**: Autentica usuário e retorna JWT token

**Request Body**:
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response Success (200)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "usuario@email.com",
      "name": "Nome do Usuário"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response Error (401)**:
```json
{
  "success": false,
  "error": {
    "message": "Credenciais inválidas",
    "code": "INVALID_CREDENTIALS"
  }
}
```

#### `POST /api/auth/logout`
**Descrição**: Invalida o token JWT atual

**Headers**: `Authorization: Bearer <token>`

**Response (200)**:
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

#### `GET /api/auth/me`
**Descrição**: Retorna dados do usuário autenticado

**Headers**: `Authorization: Bearer <token>`

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário"
  }
}
```

### Fotos (`/api/photos`)

#### `GET /api/photos`
**Descrição**: Lista todas as seções de fotos com suas respectivas fotos

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Primeira vez que nos encontramos",
      "description": "Nosso primeiro encontro especial",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "photos": [
        {
          "id": 1,
          "title": "Nosso primeiro encontro",
          "description": "Uma foto muito especial",
          "url": "/uploads/photo-1756427559704-699380652.jpg",
          "filename": "photo-1756427559704-699380652.jpg",
          "mimetype": "image/jpeg",
          "size": 35989,
          "createdAt": "2024-01-15T10:30:00.000Z",
          "updatedAt": "2024-01-15T10:30:00.000Z"
        }
      ]
    }
  ]
}
```

#### `POST /api/photos/sections`
**Descrição**: Cria uma nova seção de fotos

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Nova Seção",
  "description": "Descrição da nova seção"
}
```

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Nova Seção",
    "description": "Descrição da nova seção",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "photos": []
  }
}
```

#### `PUT /api/photos/sections/:id`
**Descrição**: Atualiza uma seção de fotos

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Título Atualizado",
  "description": "Nova descrição"
}
```

#### `DELETE /api/photos/sections/:id`
**Descrição**: Remove uma seção e todas suas fotos

**Headers**: `Authorization: Bearer <token>`

**Response (200)**:
```json
{
  "success": true,
  "message": "Seção removida com sucesso"
}
```

#### `POST /api/photos/sections/:sectionId/photos`
**Descrição**: Adiciona uma foto à seção especificada

**Headers**: 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (FormData)**:
- `file`: Arquivo da imagem (obrigatório)
- `title`: Título da foto (obrigatório)
- `description`: Descrição da foto (opcional)

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "Nova Foto",
    "description": "Descrição da foto",
    "url": "/uploads/photo-1756427559704-699380652.jpg",
    "filename": "photo-1756427559704-699380652.jpg",
    "mimetype": "image/jpeg",
    "size": 35989,
    "sectionId": 1,
    "createdAt": "2024-01-15T11:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

#### `PUT /api/photos/:id`
**Descrição**: Atualiza informações de uma foto

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Novo título",
  "description": "Nova descrição"
}
```

#### `DELETE /api/photos/:id`
**Descrição**: Remove uma foto do sistema

**Headers**: `Authorization: Bearer <token>`

**Response (200)**:
```json
{
  "success": true,
  "message": "Foto removida com sucesso"
}
```

### História (`/api/story`)

#### `GET /api/story`
**Descrição**: Retorna o conteúdo da história

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "content": "<p>Nossa história começou em um dia especial...</p>",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

#### `PUT /api/story`
**Descrição**: Atualiza o conteúdo da história

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "content": "<p>Conteúdo HTML atualizado da história...</p>"
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "content": "<p>Conteúdo HTML atualizado da história...</p>",
    "updatedAt": "2024-01-15T13:00:00.000Z"
  }
}
```

### Arquivos Estáticos (`/uploads`)

#### `GET /uploads/:filename`
**Descrição**: Serve arquivos de imagem enviados

**Response**: Arquivo binário da imagem

**Headers de Response**:
- `Content-Type`: Tipo MIME da imagem
- `Content-Length`: Tamanho do arquivo
- `Cache-Control`: Configurações de cache

## 🔒 Middlewares

### Autenticação (`auth.middleware.ts`)
```typescript
// Verifica se o usuário está autenticado
// Extrai e valida o JWT token
// Adiciona user ao request object
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  // Implementação da validação JWT
};
```

### Upload (`upload.middleware.ts`)
```typescript
// Configuração do Multer para upload de arquivos
// Validação de tipo e tamanho de arquivo
// Geração de nomes únicos para arquivos
export const uploadPhoto = multer({
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName = `photo-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${uniqueName}${path.extname(file.originalname)}`);
    }
  }),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    cb(null, allowedTypes.includes(file.mimetype));
  }
});
```

### Tratamento de Erros (`error.middleware.ts`)
```typescript
// Middleware global para tratamento de erros
// Formatação padronizada de respostas de erro
// Logging de erros para debugging
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  // Implementação do tratamento de erros
};
```

## 🔐 Segurança

### Implementações de Segurança

1. **Autenticação JWT**
   - Tokens com expiração configurável
   - Refresh token automático
   - Blacklist de tokens invalidados

2. **Hash de Senhas**
   - bcrypt com salt rounds configurável
   - Validação de força de senha

3. **CORS**
   - Configuração restritiva de origens
   - Headers permitidos controlados

4. **Rate Limiting**
   - Limite de requisições por IP
   - Proteção contra ataques de força bruta

5. **Validação de Entrada**
   - Sanitização de dados de entrada
   - Validação de tipos e formatos

6. **Upload Seguro**
   - Validação de tipos de arquivo
   - Limite de tamanho de arquivo
   - Sanitização de nomes de arquivo

## 📈 Performance

### Otimizações Implementadas

1. **Cache Redis**
   - Cache de sessões de usuário
   - Cache de consultas frequentes
   - TTL configurável por tipo de dados

2. **Compressão**
   - Compressão gzip de respostas
   - Otimização de imagens no upload

3. **Paginação**
   - Paginação automática em listas grandes
   - Lazy loading de relacionamentos

4. **Indexação de Banco**
   - Índices otimizados para consultas frequentes
   - Foreign keys com índices automáticos

## 🧪 Testes

### Estrutura de Testes
```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

### Tipos de Teste

1. **Testes Unitários**
   - Controllers
   - Middlewares
   - Utilitários

2. **Testes de Integração**
   - Rotas da API
   - Banco de dados
   - Autenticação

3. **Testes E2E**
   - Fluxos completos
   - Upload de arquivos
   - Autenticação completa

## 🚀 Deploy

### Variáveis de Produção
```env
NODE_ENV=production
PORT=3001
DATABASE_URL="mysql://user:pass@prod-db:3306/sideludi"
REDIS_URL="redis://prod-redis:6379"
JWT_SECRET="chave_super_secreta_producao"
CORS_ORIGIN="https://seudominio.com"
```

### Build e Deploy
```bash
# Build da aplicação
npm run build

# Executar migrações em produção
npm run prisma:migrate:deploy

# Iniciar servidor de produção
npm start
```

## 📊 Monitoramento

### Logs
- Logs estruturados em JSON
- Diferentes níveis de log (error, warn, info, debug)
- Rotação automática de logs

### Métricas
- Tempo de resposta das rotas
- Número de requisições por endpoint
- Erros e exceções
- Uso de memória e CPU

### Health Check
```bash
# Verificar saúde da API
GET /api/health

# Response
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "database": "connected",
  "redis": "connected"
}
```

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build            # Build da aplicação
npm start               # Servidor de produção

# Banco de dados
npm run prisma:migrate   # Criar nova migração
npm run prisma:deploy    # Aplicar migrações
npm run prisma:seed      # Executar seed
npm run prisma:studio    # Interface visual do banco

# Testes
npm test                # Executar testes
npm run test:watch      # Testes em modo watch
npm run test:coverage   # Testes com coverage

# Linting e formatação
npm run lint            # Executar ESLint
npm run lint:fix        # Corrigir problemas do ESLint
npm run format          # Formatar código com Prettier
```