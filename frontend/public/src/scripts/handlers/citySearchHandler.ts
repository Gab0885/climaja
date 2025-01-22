import { getWeather } from "../services/weatherService.js";
import { toggleWarning, clearWeatherUI } from "../utils/domUtils.js";
import { updateWeatherUI } from "./weatherHandler.js";

export const handleCitySearch = async (cityName: string) => {
  try {
    clearWeatherUI(); // Limpa os dados de clima anteriores
    toggleWarning(); // Remove qualquer mensagem de erro

    const weatherData = await getWeather(cityName);

    // Valida os dados antes de atualizar a UI
    if (!weatherData || !weatherData.name || !weatherData.weather) {
      throw new Error("Dados inválidos da API.");
    }

    // Atualiza a UI com os novos dados de clima
    updateWeatherUI(weatherData);

    // Seleciona o campo de pesquisa após a busca
    const cityInput = document.querySelector("#city_name") as HTMLInputElement;

    // Limpa o campo do input
    cityInput.value = ""; 
  } catch (error) {
    toggleWarning("Não foi possível localizar a cidade.");
  }
};

// Função para formatar o nome da cidade (remover acentos e espaços)
export const normalizeCityName = (cityName: string): string => {
  return cityName
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacríticos
};