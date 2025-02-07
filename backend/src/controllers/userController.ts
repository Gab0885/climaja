import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { prisma } from "../config/database";
import { generateToken } from "../utils/jwt";
import { comparePassword } from "../utils/hash";
import { CookieOptions } from "express";

// Define as opções do cookie
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 3600000, // 1 hora
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, confirm_password } = req.body;

    // Validação de senha
    if (password !== confirm_password) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    // Validação de nome
    if (!name || name.trim().length < 3) {
      return res.status(400).json({ error: "Nome inválido" });
    }

    // Verificar usuário existente
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já está cadastrado" });
    }

    // Criar usuário
    const user = await createUser({ name, email, password });
    const token = generateToken(user.id, user.name, []);

    res.cookie("jwt", token, cookieOptions);

    return res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Buscar usuário e cidade favorita
    const user = await prisma.user.findUnique({
      where: { email },
      include: { favorites: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Verificar senha
    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Extrair nomes das cidades favoritas
    const favoriteCities = user.favorites.map((fav) => fav.cityName);

    // Gerar token
    const token = generateToken(user.id, user.name, favoriteCities);

    // Configurar cookie
    res.cookie("jwt", token, cookieOptions);

    return res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Adicionar cidade favorita
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    let { cityName } = req.body;

    if (typeof cityName !== "string" || cityName.trim() === "") {
      return res.status(400).json({ error: "Nome de cidade inválido" });
    }
    cityName = cityName.trim();

    // Verificar se o usuário existe e obter os favoritos
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Limite de 3 favoritos
    if (user.favorites.length >= 3) {
      return res.status(400).json({ error: "Máximo de 3 cidades favoritas alcançado" });
    }

    // Verifica se a cidade já está nos favoritos
    if (user.favorites.some(fav => fav.cityName === cityName)) {
      return res.status(400).json({ error: "Cidade já está nos favoritos" });
    }

    // Adicionar novo favorito
    await prisma.favorite.create({ data: { cityName, userId } });

    // Atualiza a lista e gera novo token
    const { favorites, token } = await updateFavorites(userId, res.locals.user.name);
    res.cookie("jwt", token, cookieOptions);
    res.json({ favorites });
    
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};

// Remover cidade favorita
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    let { cityName } = req.body;

    if (typeof cityName !== "string" || cityName.trim() === "") {
      return res.status(400).json({ error: "Nome de cidade inválido" });
    }
    cityName = cityName.trim();

    await prisma.favorite.deleteMany({ where: { userId, cityName } });

    // Atualiza a lista e gera novo token
    const { favorites, token } = await updateFavorites(userId, res.locals.user.name);
    res.cookie("jwt", token, cookieOptions);
    res.json({ favorites });
    
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  // Limpa o cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.redirect("/");
};

// Função auxiliar para atualizar a lista de favoritos e gerar um novo token
const updateFavorites = async (userId: number, userName: string) => {
  const updated = await prisma.favorite.findMany({
    where: { userId },
    select: { cityName: true }
  });
  const favorites = updated.map(fav => fav.cityName);
  const token = generateToken(userId, userName, favorites);
  return { favorites, token };
};