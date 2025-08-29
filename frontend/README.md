# Frontend - Nossa História

Interface web desenvolvida em React/TypeScript para a aplicação "Nossa História".

## 🎨 Tecnologias e Bibliotecas

### Core
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento

### UI e Estilização
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de UI
- **Lucide React** - Ícones
- **Class Variance Authority (CVA)** - Variantes de componentes

### Funcionalidades
- **React Query (TanStack Query)** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários
- **React Quill** - Editor de texto rico
- **Sonner** - Notificações toast

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 18+ e npm
- Backend rodando na porta 3001

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Aplicação estará disponível em http://localhost:8080
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do frontend:
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME="Nossa História"
VITE_NODE_ENV=development
```

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes base do Shadcn
│   │   ├── Layout.tsx      # Layout principal
│   │   └── Navigation.tsx  # Barra de navegação
│   ├── contexts/           # Contextos React
│   │   └── AuthContext.tsx # Contexto de autenticação
│   ├── hooks/              # Hooks customizados
│   │   └── use-toast.ts    # Hook para notificações
│   ├── lib/                # Utilitários
│   │   └── utils.ts        # Funções auxiliares
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.tsx        # Página inicial
│   │   ├── Photos.tsx      # Galeria de fotos
│   │   ├── Story.tsx       # Página da história
│   │   ├── Login.tsx       # Página de login
│   │   └── NotFound.tsx    # Página 404
│   ├── services/           # Serviços de API
│   │   ├── api.ts          # Cliente HTTP base
│   │   ├── photo.service.ts # Serviços de fotos
│   │   └── story.service.ts # Serviços de história
│   ├── styles/             # Estilos customizados
│   │   └── quill-custom.css # Estilos do editor
│   ├── App.tsx             # Componente raiz
│   ├── main.tsx            # Ponto de entrada
│   └── index.css           # Estilos globais
├── public/                 # Arquivos estáticos
└── dist/                   # Build de produção
```

## 🎯 Páginas e Funcionalidades

### 🏠 Home (`/`)
- Página de boas-vindas com design romântico
- Navegação para outras seções
- Animações suaves e gradientes
- Layout responsivo

### 📸 Fotos (`/fotos`)
**Funcionalidades Públicas**:
- Visualização de galeria organizada por seções
- Layout responsivo em grid
- Carregamento otimizado de imagens

**Funcionalidades Autenticadas**:
- ✅ Adicionar novas seções de fotos
- ✅ Upload de fotos com drag & drop
- ✅ Editar títulos e descrições
- ✅ Excluir fotos e seções
- ✅ Botões de ação diretos na página

### 📖 História (`/historia`)
**Funcionalidades Públicas**:
- Leitura da história formatada
- Typography otimizada para leitura

**Funcionalidades Autenticadas**:
- ✅ Editor de texto rico (ReactQuill)
- ✅ Formatação: negrito, itálico, sublinhado
- ✅ Listas ordenadas e não ordenadas
- ✅ Links e alinhamento de texto
- ✅ Salvamento automático
- ✅ Preview em tempo real

### 🔐 Login (`/login`)
- Formulário de autenticação
- Validação de campos
- Feedback visual de erros
- Redirecionamento após login

## 🧩 Componentes Principais

### Navigation
- Menu responsivo com hamburger no mobile
- ✅ Botão de logout quando autenticado
- Indicação visual da página ativa
- Sticky header com backdrop blur

### Layout
- Wrapper principal da aplicação
- Gradiente de fundo romântico
- Estrutura consistente entre páginas

### Componentes UI
Componentes base do Shadcn/ui customizados:
- **Button** - Botões com variantes românticas
- **Card** - Cards com glassmorphism
- **Dialog** - Modais para edição
- **Input** - Campos de entrada estilizados
- **Toast** - Notificações

## 🔐 Sistema de Autenticação

### AuthContext
- Gerenciamento global do estado de autenticação
- Persistência de token no localStorage
- Auto-logout em caso de token expirado
- Interceptação de requisições HTTP

### Fluxo de Autenticação
1. Login via formulário
2. Token JWT armazenado no localStorage
3. Token incluído automaticamente nas requisições
4. Verificação automática na inicialização
5. Logout limpa token e redireciona

## 🌐 Serviços de API

### Cliente HTTP Base (`api.ts`)
- Configuração do Axios com interceptors
- Adição automática de token de autenticação
- Tratamento de erros globais

### Photo Service
- `getPhotoSections()` - Lista seções de fotos
- `createPhotoSection(data)` - Cria nova seção
- `updatePhotoSection(id, data)` - Atualiza seção
- `deletePhotoSection(id)` - Remove seção
- `uploadPhoto(sectionId, formData)` - Upload de foto
- `updatePhoto(id, data)` - Atualiza foto
- `deletePhoto(id)` - Remove foto

### Story Service
- `getStory()` - Obtém conteúdo da história
- `updateStory(content)` - Atualiza história

## 🎨 Design System

### Tema Romântico
- Gradientes suaves e cores pastéis
- Animações delicadas
- Typography elegante
- Glassmorphism nos componentes

### Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Grid Responsivo**: Fotos adaptam-se ao tamanho da tela
- **Menu Hamburger**: Navegação colapsável no mobile

## 🔧 Configuração

### Vite Config
- Proxy para API backend (`/api` → `http://localhost:3001`)
- Proxy para uploads (`/uploads` → `http://localhost:3001`)
- Alias `@` para `./src`
- Servidor na porta 8080

### Tailwind Config
- Cores customizadas românticas
- Gradientes personalizados
- Animações suaves
- Plugin de animações

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento (porta 8080)
npm run build            # Build de produção
npm run preview          # Preview do build

# Qualidade de código
npm run lint             # ESLint
npm run type-check       # Verificação de tipos TypeScript
```

## 📱 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Login com email/senha
- [x] Logout com limpeza de sessão
- [x] Persistência de autenticação
- [x] Proteção de rotas
- [x] Botão de logout na navegação

### ✅ Galeria de Fotos
- [x] Visualização pública de fotos
- [x] Organização por seções
- [x] Upload de fotos (autenticado)
- [x] Edição de títulos e descrições
- [x] Exclusão de fotos e seções
- [x] Layout responsivo
- [x] Botões de ação diretos na página

### ✅ Editor de História
- [x] Visualização pública da história
- [x] Editor de texto rico (autenticado)
- [x] Formatação completa (negrito, itálico, listas)
- [x] Salvamento automático
- [x] Preview em tempo real

### ✅ Interface e UX
- [x] Design responsivo
- [x] Tema romântico consistente
- [x] Navegação intuitiva
- [x] Feedback visual (toasts)
- [x] Loading states
- [x] Tratamento de erros

## 🐛 Troubleshooting

### Problemas Comuns

**Erro de CORS**:
- Verificar se o proxy está configurado no vite.config.ts
- Verificar se o backend está rodando na porta 3001

**Imagens não carregam**:
- Verificar se o proxy /uploads está funcionando
- Verificar se as URLs das imagens estão corretas
- Verificar permissões da pasta uploads no backend

**Autenticação não funciona**:
- Verificar se o token está sendo enviado nas requisições
- Verificar se o AuthContext está envolvendo a aplicação
- Verificar localStorage para token

---

**Desenvolvido com ❤️ usando React e TypeScript**
