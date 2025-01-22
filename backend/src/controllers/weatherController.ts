import { Request, Response } from "express";
import { getWeatherData } from "../services/weatherService";

export async function getWeather(req: Request, res: Response): Promise<void> {
  const cityName = req.query.city as string;

  if (!cityName || !/^[a-zA-Z\s]+$/.test(cityName)) {
    res.status(400).json({ error: "Nome da cidade inválido." });
    return;
  }

  try {
    const weatherData = await getWeatherData(cityName);
    res.json(weatherData);
  } catch (error) {
    console.error("Erro no controlador:", error);
    res.status(500).json({ error: "Erro ao obter os dados do clima." });
  }
}