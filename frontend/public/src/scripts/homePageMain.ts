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

// Se os itens iniciais de favoritos foram renderizados pelo EJS, os cliques neles também disparam a pesquisa:
document.querySelectorAll("#favorite-cities-user ul li .city-button").forEach((button) => {
  button.addEventListener("click", async (event) => {
    // Evita que o clique em algum botão interno (como remover) dispare a pesquisa
    event.stopPropagation();
    const cityName = normalizeCityName(button.textContent || "");
    await handleCitySearch(cityName);
  });
});