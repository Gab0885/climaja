import { Router } from "express";
import { renderHomePage } from "../controllers/homeController";

const router = Router();

// Renderiza a pagina inicial
router.get("/", renderHomePage);

export { router };
