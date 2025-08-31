import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Configuração do storage do multer
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        // Gera um nome único para o arquivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    console.log('File filter - mimetype:', file.mimetype, 'originalname:', file.originalname);
    if (file.mimetype.startsWith('image/')) {
        console.log('File accepted as image');
        cb(null, true);
    } else {
        console.log('File rejected - not an image');
        cb(new Error('Apenas arquivos de imagem são permitidos!'));
    }
};

// Configuração do multer
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5MB
    }
});