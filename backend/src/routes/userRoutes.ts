import express from 'express';
import { addFavorite, loginUser, logoutUser, registerUser, removeFavorite } from '../controllers/userController';

const router = express.Router();

// Rotas de autenticação
router.post('/register', registerUser);
router.post('/login', loginUser)
router.get("/logout", logoutUser)

// Rotas para manipulação de favoritos (rotas protegidas)
router.post("/favorites/add", addFavorite);
router.post("/favorites/remove",removeFavorite);

export { router };