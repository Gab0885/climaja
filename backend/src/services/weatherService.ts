import { config } from "../config/env";
import { fetchFromApi } from "../utils/apiClient";

export async function getWeatherData(cityName: string) {
  const apiKey = config.apiKey;
  const apiUrl = config.apiUrl;

  const url = `${apiUrl}?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

  return await fetchFromApi(url);
}
