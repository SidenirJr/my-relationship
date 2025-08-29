import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estendendo a interface Request para incluir userId
declare module 'express-session' {
    interface SessionData {
        userId: string;
    }
}

// Estendendo a interface Request para incluir userId
interface AuthenticatedRequest extends Request {
    userId?: string;
}

/**
 * Middleware para verificar se o usuário está autenticado
 */
export const isAuthenticated = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    // Verifica se existe uma sessão ativa
    if (req.session && req.session.userId) {
        req.userId = req.session.userId;
        return next();
    }

    // Verifica se existe um token JWT no header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ message: 'Erro no formato do token' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET || 'sideludi_secret_key',
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }

            req.userId = (decoded as { id: string }).id;
            return next();
        }
    );
};