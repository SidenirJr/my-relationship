# Nossa História - Aplicação Web Romântica

Uma aplicação web completa para casais compartilharem suas memórias através de fotos e histórias.

## 🌟 Funcionalidades

- **Galeria de Fotos**: Compartilhe momentos especiais com uma galeria de fotos.
- **Histórias**: Crie e compartilhe histórias românticas com seus amigos.
- **Edição Restrita**: Acesse uma página de login para editar conteúdo da galeria e histórias.
- **Design Responsivo**: Acesse a aplicação de qualquer dispositivo, seja desktop, tablet ou celular.

## Lembre-se
 - Alterar nomes na pagina Home.tsx
 - Alterar data de namoro no componente LoveCounter.tsx 

## 🚀 Bibliotecas e Versões

### Frontend
- **React** 18.3.1
- **TypeScript** 5.8.3
- **Vite** 5.4.19
- **Tailwind CSS** 3.4.17
- **React Router DOM** 6.30.1
- **TanStack React Query** 5.83.0
- **React Hook Form** 7.61.1
- **React Quill** 2.0.0
- **Axios** 1.11.0
- **Zod** 3.25.76
- **Lucide React** 0.462.0
- **Radix UI** (diversos componentes)
- **Shadcn/ui** (sistema de componentes)

### Backend
- **Node.js** com **TypeScript** 5.3.3
- **Express.js** 4.18.3
- **Prisma** 5.10.0
- **bcrypt** 5.1.1
- **jsonwebtoken** 9.0.2
- **multer** 1.4.5-lts.1
- **cors** 2.8.5
- **helmet** 7.1.0
- **morgan** 1.10.0
- **ioredis** 5.3.2
- **zod** 3.22.4

### Infraestrutura
- **Docker** e **Docker Compose**
- **MySQL** (banco de dados)
- **Redis** (cache e sessões)
- **Nginx** (proxy reverso)

## 🛠️ Como Iniciar o Projeto

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd sideludi
```

### 2. Inicie com Docker Compose
```bash
# Inicie todos os serviços
docker compose up -d

# Execute as migrações do Prisma
docker compose exec backend npx prisma migrate deploy

# (Opcional) Execute o seed para dados iniciais
docker compose exec backend npx prisma db seed
```

### 3. Acesse a aplicação
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

## 🔄 Aplicando Mudanças Durante o Desenvolvimento

Quando você modificar o código da aplicação, é necessário rebuildar os containers Docker para que as mudanças sejam refletidas:

### Para mudanças no Frontend:
```bash
# Rebuild apenas o frontend
docker compose build frontend
docker compose up -d frontend
```

### Para mudanças no Backend:
```bash
# Rebuild apenas o backend
docker compose build backend
docker compose up -d backend
```

### Para rebuildar tudo:
```bash
# Rebuild todos os serviços
docker compose build
docker compose up -d
```

### Desenvolvimento Ágil (Alternativa):
Para desenvolvimento mais rápido com hot-reload, você pode rodar localmente:

```bash
# Frontend (em um terminal)
cd frontend
npm install
npm run dev  # Disponível em http://localhost:5173

# Backend (em outro terminal)
cd backend
npm install
npm run dev  # Disponível em http://localhost:3001
```

**Nota:** Certifique-se de que MySQL e Redis estejam rodando via Docker mesmo no desenvolvimento local.

## 🔐 Página de Login para Edição

A aplicação possui uma página de login (`/login`) que permite autenticação para editar conteúdos. Após o login bem-sucedido, os usuários podem:
- Adicionar e editar fotos nas seções
- Criar e modificar histórias
- Gerenciar o conteúdo da aplicação

O sistema utiliza JWT para autenticação e sessões Redis para gerenciamento de estado.

## 📱 Estrutura de Páginas

A aplicação é organizada nas seguintes páginas principais:

- **Home** (`/`) - Página inicial com apresentação do casal
- **Photos** (`/photos`) - Galeria de fotos organizadas por seções temáticas
- **Story** (`/story`) - Página com a história do casal em formato de texto rico
- **Login** (`/login`) - Página de autenticação para edição de conteúdo
- **NotFound** (`/404`) - Página de erro para rotas não encontradas

Cada página é desenvolvida como um componente React independente, utilizando React Router para navegação e React Query para gerenciamento de estado e cache de dados da API.

**Desenvolvido com ❤️ para Ludimila**