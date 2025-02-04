import { Router } from 'express';
import { renderLoginPage, renderRegisterPage } from '../controllers/authController';

const router = Router();

// Renderiza a pagina de login
router.get('/login', renderLoginPage);

// Renderiza a pagina de registro
router.get('/registro', renderRegisterPage);

export { router };