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
    if (!cityElement || !temperatureElement || !temperatureDescriptionElement || !temperatureMaxElement ||
        !temperatureMinElement || !humidityElement || !windElement || !temperatureImgElement) {
        console.error("Um ou mais elementos do DOM não foram encontrados.");
        return;
    }
    // Mostra o card de clima ao fazer a pesquisa
    document.querySelector("#weather")?.classList.add("show");
    // Função auxiliar para formatação de temperaturas
    const formatTemperature = (temp) => `${temp.toFixed(1).replace('.', ',')} <sup>Cº</sup>`;
    // Atualização dos valores no DOM
    cityElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.innerHTML = formatTemperature(data.main.temp);
    temperatureMaxElement.innerHTML = formatTemperature(data.main.temp_max);
    temperatureMinElement.innerHTML = formatTemperature(data.main.temp_min);
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed.toFixed(1)} km/h`;
    // Atualiza o ícone de clima
    temperatureImgElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperatureImgElement.alt = data.weather[0].description;
}
