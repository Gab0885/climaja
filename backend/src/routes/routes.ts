import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.render("homePage", { user:  null}));

router.get("/login", (req, res) => res.render('login'))

router.get("/registro", (req, res) => res.render('register'))

export { router }