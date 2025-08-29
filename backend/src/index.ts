import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

// Importação das rotas
import authRoutes from './routes/auth.routes';
import photoRoutes from './routes/photo.routes';
import storyRoutes from './routes/story.routes';

// Carrega as variáveis de ambiente
dotenv.config();

// Inicialização do app Express
const app = express();
const PORT = process.env.PORT || 3001;

// Inicialização do cliente Prisma
const prisma = new PrismaClient();

// Configuração do cliente Redis
const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
});

// Middleware para logs
app.use(morgan('dev'));

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "http://localhost:3001", "http://localhost:8080"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:"],
            scriptSrc: ["'self'"]
        }
    }
}));

// Middleware para CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://sideludi.com' 
        : 'http://localhost:8080',
    credentials: true
}));

// Middleware para parsing de JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static('uploads'));

// Configuração da sessão com Redis
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'sideludi_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
}));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/story', storyRoutes);

// Rota de verificação de saúde
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Interface para erro com status
interface AppError extends Error {
  status?: number;
}

// Middleware para tratamento de erros
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error('Erro não tratado:', err);
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor';
    res.status(status).json({ error: message });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Tratamento de encerramento do processo
process.on('SIGINT', async () => {
    console.log('\n🔄 Encerrando servidor...');
    await prisma.$disconnect();
    redisClient.disconnect();
    process.exit(0);
});