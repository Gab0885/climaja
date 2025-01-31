import { Router } from 'express';
import { renderLoginPage, renderRegisterPage } from '../controllers/authController';
import { logoutUser } from '../controllers/userController';

const router = Router();

// Renderiza a pagina de login
router.get('/login', renderLoginPage);

// Renderiza a pagina de registro
router.get('/registro', renderRegisterPage);

// Faz logout do usuário
router.get("/logout", logoutUser)

export { router };