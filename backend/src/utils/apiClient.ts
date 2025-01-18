import axios from "axios";
import { HttpError } from "../../errors/HttpError";

export async function fetchFromApi(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API externa:", error);
    throw new HttpError(500, "Erro na comunicação com a API externa.");
  }
}