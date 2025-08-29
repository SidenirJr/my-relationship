import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Controlador para login de usuário
 */
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'sideludi_secret_key',
            {
                expiresIn: '24h'
            }
        );

        // Salva o ID do usuário na sessão
        req.session.userId = user.id;

        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username
            },
            token
        });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro ao fazer login' });
    }
};

/**
 * Controlador para logout de usuário
 */
export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.status(500).json({ message: 'Erro ao fazer logout' });
        }

        return res.status(200).json({ message: 'Logout realizado com sucesso' });
    });
};

/**
 * Controlador para verificar se o usuário está autenticado
 */
export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        
        if (!userId) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        // Busca as informações do usuário
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, username: true }
        });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ 
            authenticated: true,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};