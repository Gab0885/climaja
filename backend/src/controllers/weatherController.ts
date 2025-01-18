import { Request, Response } from "express";
import { getWeatherData } from "../services/weatherService";

export async function getWeather(req: Request, res: Response): Promise<void> {
  const cityName = req.query.city as string;

  if (!cityName || !/^[a-zA-Z\s]+$/.test(cityName)) {
    res.status(400).json({ error: "Nome da cidade inválido." });
    return;
  }

  try {
    const data = await getWeatherData(cityName);
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados da API externa:", error);
    res.status(500).json({ error: "Erro ao buscar dados da previsão do tempo." });
  }
}
