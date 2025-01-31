import express from "express";
import path from "path";
import { weatherRouter } from "./routes/weatherRoutes";
import { router as homeRoutes } from "./routes/homeRouters";
import { router as authRoutes } from "./routes/authRoutes";
import { router as userRoutes } from "./routes/userRoutes";
import cookieParser from "cookie-parser"
import { authMiddleware } from "./middlewares/authMiddleware";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// Configuração do EJS como mecanismo de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend/public/pages"));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../../frontend/public")));

// Middleware para parsing de requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de cookies e autenticação
app.use(cookieParser())
app.use(authMiddleware)

// Rotas
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes)
app.use("/api", weatherRouter);

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});