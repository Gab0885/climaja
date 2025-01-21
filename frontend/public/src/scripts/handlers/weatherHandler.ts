export function updateWeatherUI(data: any) {
  // Seletores do DOM
  const cityElement = document.querySelector("#title") as HTMLElement;
  const temperatureElement = document.querySelector("#temperature_value") as HTMLElement;
  const temperatureDescriptionElement = document.querySelector("#temperature_description") as HTMLElement;
  const temperatureMaxElement = document.querySelector(".temperature_max") as HTMLElement;
  const temperatureMinElement = document.querySelector(".temperature_min") as HTMLElement;
  const humidityElement = document.querySelector(".humidity") as HTMLElement;
  const windElement = document.querySelector(".wind") as HTMLElement;
  const temperatureImgElement = document.querySelector("#temperature_img") as HTMLImageElement;
  
  // Verifica se os elementos foram encontrados
  if (
    !cityElement ||
    !temperatureElement ||
    !temperatureDescriptionElement ||
    !temperatureMaxElement ||
    !temperatureMinElement ||
    !humidityElement ||
    !windElement ||
    !temperatureImgElement
  ) {
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