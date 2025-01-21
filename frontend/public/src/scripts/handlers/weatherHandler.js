export function updateWeatherUI(data) {
    // Seletores do DOM
    const cityElement = document.querySelector("#title");
    const temperatureElement = document.querySelector("#temperature_value");
    const temperatureDescriptionElement = document.querySelector("#temperature_description");
    const temperatureMaxElement = document.querySelector(".temperature_max");
    const temperatureMinElement = document.querySelector(".temperature_min");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");
    const temperatureImgElement = document.querySelector("#temperature_img");
    // Verifica se os elementos foram encontrados
    if (!cityElement ||
        !temperatureElement ||
        !temperatureDescriptionElement ||
        !temperatureMaxElement ||
        !temperatureMinElement ||
        !humidityElement ||
        !windElement ||
        !temperatureImgElement) {
        console.error("Um ou mais elementos do DOM não foram encontrados.");
        return;
    }
    // Atualização dos valores no DOM
    cityElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.innerHTML = `${Math.round(data.main.temp)} <sup>Cº</sup>`;
    temperatureMaxElement.innerHTML = `${Math.round(data.main.temp_max)} <sup>Cº</sup>`;
    temperatureMinElement.innerHTML = `${Math.round(data.main.temp_min)} <sup>Cº</sup>`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${Math.round(data.wind.speed)} km/h`;
    // Atualiza o ícone de clima
    temperatureImgElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperatureImgElement.alt = data.weather[0].description;
}
