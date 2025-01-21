import { getWeather } from "../services/weatherService.js";
import { updateWeatherUI } from "./handlers/weatherHandler.js";

const searchForm = document.querySelector("#search");
console.log(searchForm); // Verifique se o elemento foi encontrado

if (searchForm) {
  searchForm.addEventListener("submit", async (event) => {
    console.log("Form submitted");
    event.preventDefault();
  const cityInput = document.querySelector("#city_name") as HTMLInputElement;

  if (!cityInput || !cityInput.value) {
    showWarning("Digite o nome da cidade, por favor.");
    return;
  }

  const cityName = cityInput.value.trim();

  try {
    const weatherData = await getWeather(cityName);
    console.log(weatherData)
    updateWeatherUI(weatherData);
  } catch (error: any) {
    showWarning(error.message);
  }
});

function showWarning(msg: string) {
  const warnElement = document.querySelector("#warn");
  if (warnElement) {
    warnElement.textContent = msg;
  }
}}