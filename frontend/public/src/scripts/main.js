import { getWeather } from "../services/weatherService.js";
import { updateWeatherUI } from "./handlers/weatherHandler.js";
document.querySelector("#search")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityInput = document.querySelector("#city_name");
    if (!cityInput || !cityInput.value) {
        showWarning("Digite o nome da cidade, por favor.");
        return;
    }
    const cityName = cityInput.value.trim();
    try {
        const weatherData = await getWeather(cityName);
        console.log(weatherData);
        updateWeatherUI(weatherData);
    }
    catch (error) {
        showWarning(error.message);
    }
});
function showWarning(msg) {
    const warnElement = document.querySelector("#warn");
    if (warnElement) {
        warnElement.textContent = msg;
    }
}
