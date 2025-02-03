import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, getJwtSecret()) as {
        userId: number;
        name: string;
        favorites: string[];
        iat?: number;
        exp?: number;
      };

      // Validação adicional de tipos
      if (typeof decoded.userId !== 'number' || typeof decoded.name !== 'string' || typeof decoded.favorites !== "object") {
        throw new Error('Token invalido!');
      }

      res.locals.user = {
        id: decoded.userId,
        name: decoded.name,
        favorites: decoded.favorites,
      };
    } catch (err) {
      console.error('Erro de autenticação:', err);
      res.clearCookie("jwt");
    }
  }
  next();
};