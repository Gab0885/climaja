import dotenv from 'dotenv';

// Carregar o .env
dotenv.config();

// Verificar se as variáveis estão definidas
if (!process.env.api_URL || !process.env.api_KEY) {
  throw new Error('API_URL ou API_KEY não foram definidas no arquivo .env');
}

// Exportar as configurações
export const config = {
  apiUrl: process.env.api_URL as string,
  apiKey: process.env.api_KEY as string,
};