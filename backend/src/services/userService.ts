import { prisma } from "../config/database";
import { hashPassword } from "../utils/hash";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: UserData) => {
  // Hash da senha
  const hashedPassword = await hashPassword(password);

  // Registro no banco
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};
