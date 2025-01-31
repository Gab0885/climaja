import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { prisma } from "../config/database";
import { generateToken } from "../utils/jwt";

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
    const token = generateToken(user.id, user.name);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hora
    });

    return res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  // Limpa o cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
  res.redirect('/');
};