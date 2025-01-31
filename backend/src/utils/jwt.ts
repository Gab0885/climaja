import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido no ambiente.");
}

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h' // Token expira em 1 hora
  });
};