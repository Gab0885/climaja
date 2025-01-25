import { handleCitySearch, normalizeCityName } from "./handlers/citySearchHandler.js";
import { toggleWarning } from "./utils/domUtils.js";

document.querySelector("#search")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityInput = document.querySelector("#city_name") as HTMLInputElement;
  if (!cityInput || !cityInput.value.trim()) {
    toggleWarning("Digite o nome da cidade, por favor.");
    return;
  }

  const cityName = normalizeCityName(cityInput.value);
  await handleCitySearch(cityName);
});

document.querySelectorAll("#favorite-cities-user ul li").forEach((cityElement) => {
  cityElement.addEventListener("click", async () => {
    const cityName = normalizeCityName(cityElement.textContent || "");
    await handleCitySearch(cityName);
  });
});