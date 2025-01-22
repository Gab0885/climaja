interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; temp_max: number; temp_min: number; humidity: number };
  wind: { speed: number };
  weather: [{ icon: string; description: string }];
}

export function updateWeatherUI(data: WeatherData): void {
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
  if (!cityElement || !temperatureElement || !temperatureDescriptionElement || !temperatureMaxElement ||
    !temperatureMinElement || !humidityElement || !windElement || !temperatureImgElement) {
    console.error("Um ou mais elementos do DOM não foram encontrados.");
    return;
  }

  // Mostra o card de clima ao fazer a pesquisa
  document.querySelector("#weather")?.classList.add("show");

  // Função auxiliar para formatação de temperaturas
  const formatTemperature = (temp: number): string => `${temp.toFixed(1).replace('.', ',')} <sup>Cº</sup>`;

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