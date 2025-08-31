import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Obter todas as seções de fotos
 */
export const getAllPhotoSections = async (req: Request, res: Response) => {
    try {
        const photoSections = await prisma.photoSection.findMany({
            include: {
                photos: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return res.status(200).json(photoSections);
    } catch (error) {
        console.error('Erro ao buscar seções de fotos:', error);
        return res.status(500).json({ message: 'Erro ao buscar seções de fotos' });
    }
};

/**
 * Obter uma seção de fotos por ID
 */
export const getPhotoSectionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const photoSection = await prisma.photoSection.findUnique({
            where: { id: parseInt(id) },
            include: {
                photos: true
            }
        });

        if (!photoSection) {
            return res.status(404).json({ message: 'Seção de fotos não encontrada' });
        }

        return res.status(200).json(photoSection);
    } catch (error) {
        console.error('Erro ao buscar seção de fotos:', error);
        return res.status(500).json({ message: 'Erro ao buscar seção de fotos' });
    }
};

/**
 * Criar uma nova seção de fotos
 */
export const createPhotoSection = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;

        const photoSection = await prisma.photoSection.create({
            data: {
                title
            }
        });

        return res.status(201).json(photoSection);
    } catch (error) {
        console.error('Erro ao criar seção de fotos:', error);
        return res.status(500).json({ message: 'Erro ao criar seção de fotos' });
    }
};

/**
 * Atualizar uma seção de fotos
 */
export const updatePhotoSection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const photoSection = await prisma.photoSection.update({
            where: { id: parseInt(id) },
            data: {
                title
            }
        });

        return res.status(200).json(photoSection);
    } catch (error) {
        console.error('Erro ao atualizar seção de fotos:', error);
        return res.status(500).json({ message: 'Erro ao atualizar seção de fotos' });
    }
};

/**
 * Excluir uma seção de fotos
 */
export const deletePhotoSection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.photoSection.delete({
            where: { id: parseInt(id) }
        });

        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir seção de fotos:', error);
        return res.status(500).json({ message: 'Erro ao excluir seção de fotos' });
    }
};

/**
 * Adicionar uma foto a uma seção
 */
export const addPhotoToSection = async (req: Request, res: Response) => {
    try {
        const { photoSectionId } = req.params;
        
        // Verifica se um arquivo foi enviado
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo foi enviado' });
        }

        // Gera a URL relativa do arquivo para funcionar com o proxy nginx
        const url = `/uploads/${req.file.filename}`;
        console.log('Creating photo with URL:', url);

        const photo = await prisma.photo.create({
            data: {
                url,
                photoSectionId: parseInt(photoSectionId)
            }
        });
        
        console.log('Photo created:', photo);

        return res.status(201).json(photo);
    } catch (error) {
        console.error('Erro ao adicionar foto:', error);
        return res.status(500).json({ message: 'Erro ao adicionar foto' });
    }
};

/**
 * Excluir uma foto
 */
export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.photo.delete({
            where: { id: parseInt(id) }
        });

        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir foto:', error);
        return res.status(500).json({ message: 'Erro ao excluir foto' });
    }
};