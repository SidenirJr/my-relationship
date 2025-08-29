import { Router } from 'express';
import { getStory, updateStory } from '../controllers/story.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

// Rota pública
router.get('/', getStory);

// Rota protegida (requer autenticação)
router.put('/:id', isAuthenticated, updateStory);

export default router;