import { Router } from 'express';
import {
  getAllPhotoSections,
  getPhotoSectionById,
  createPhotoSection,
  updatePhotoSection,
  deletePhotoSection,
  addPhotoToSection,
  deletePhoto
} from '../controllers/photo.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Rotas públicas
router.get('/', getAllPhotoSections);
router.get('/:id', getPhotoSectionById);

// Rotas protegidas (requerem autenticação)
router.post('/', isAuthenticated, createPhotoSection);
router.put('/:id', isAuthenticated, updatePhotoSection);
router.delete('/:id', isAuthenticated, deletePhotoSection);
router.post('/:photoSectionId/photos', isAuthenticated, upload.single('photo'), addPhotoToSection);
router.delete('/photos/:id', isAuthenticated, deletePhoto);

export default router;