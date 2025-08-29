import { Router } from 'express';
import { login, logout, checkAuth } from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

// Rota para login
router.post('/login', login);

// Rota para logout (requer autenticação)
router.post('/logout', isAuthenticated, logout);

// Rota para verificar autenticação
router.get('/check', isAuthenticated, checkAuth);

export default router;