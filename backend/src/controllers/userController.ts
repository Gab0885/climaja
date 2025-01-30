import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { prisma } from "../config/database";
import { generateToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({ error: "Email já está cadastrado" });
    }

    // Tentar criar o usuário
    const user = await createUser(req.body);

    // Gerar token JWT
    const token = generateToken(user.id);

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
