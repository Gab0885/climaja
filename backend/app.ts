const express = require("express");
const ejs = require("ejs");
const path = require("node:path");

const app = express();

// Configuração do EJS como mecanismo de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend/public/pages"));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../../frontend/public/assets")));

// Middleware para parsing de requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
