import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { prisma } from "../config/database";
import { generateToken } from "../utils/jwt";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password, confirm_password, name } = req.body;

    // Validação de senha
    if (password !== confirm_password) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    // Verificar usuário existente
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já está cadastrado" });
    }

    // Criar usuário
    const user = await createUser({ name, email, password });
    const token = generateToken(user.id);

    // Resposta de sucesso
    return res.status(201).json({ token }); // Adicione return aqui
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
