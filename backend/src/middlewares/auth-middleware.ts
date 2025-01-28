import { z } from "zod";
import { Request, Response, NextFunction } from "express";

// Esquema de validação
const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(50, "O nome não pode ter mais de 50 caracteres"),
  email: z.string().email("Email inválido").trim().toLowerCase(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").max(50, "A senha não pode ter mais de 50 caracteres"),
});

// Middleware de validação
export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validação do corpo da requisição
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.render('register', {
        message: error.errors[0].message,
        type: 'error', // Tipo de mensagem para estilização
      });
      // res.status(400).json({
      //   errors: error.errors.map((err) => ({
      //     path: err.path,
      //     message: err.message,
      //   })),
      // });
    }
    next(error);
  }
};
