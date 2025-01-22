import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.render("index", { user: { favoriteCities: ["São Paulo", "Rio de Janeiro", "Brasilia"] }}));

router.get("/login", (req, res) => res.render('login'))

export { router }