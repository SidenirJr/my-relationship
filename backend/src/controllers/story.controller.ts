import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Obter a história
 */
export const getStory = async (req: Request, res: Response) => {
    try {
        // Busca a primeira história ou cria uma padrão se não existir
        let story = await prisma.story.findFirst();

        if (!story) {
            story = await prisma.story.create({
                data: {
                    title: 'Nossa História',
                    content: 'Escreva sua história aqui...'
                }
            });
        }

        return res.status(200).json(story);
    } catch (error) {
        console.error('Erro ao buscar história:', error);
        return res.status(500).json({ message: 'Erro ao buscar história' });
    }
};

/**
 * Atualizar a história
 */
export const updateStory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const story = await prisma.story.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content
            }
        });

        return res.status(200).json(story);
    } catch (error) {
        console.error('Erro ao atualizar história:', error);
        return res.status(500).json({ message: 'Erro ao atualizar história' });
    }
};