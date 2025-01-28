import { Request, Response } from "express";
import { createUser } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Tentar criar o usuário
    const user = await createUser(req.body);

    // Em caso de sucesso, renderiza a página com a mensagem de sucesso
    res.render("register", {
      message: "Usuário registrado com sucesso!",
      type: "success", // Tipo de mensagem para estilização
    });
  } catch (error) {
    // Em caso de erro (ex: falha na criação do usuário), renderiza a página com a mensagem de erro
   res.render('register', {
      message: 'Erro ao registrar o usuário. Tente novamente.',
      type: 'error', // Tipo de mensagem para estilização
    });
  }
};
