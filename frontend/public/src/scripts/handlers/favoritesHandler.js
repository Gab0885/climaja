import { handleCitySearch } from "./citySearchHandler.js";
// Inicializa a funcionalidade de favoritos: associa o evento ao ícone de favoritar se o usuário estiver logado.
const initializeFavoriteFeature = () => {
    const favoriteIcon = document.getElementById("favorite-icon");
    const isUserLoggedIn = document.getElementById("userName") !== null;
    if (favoriteIcon && isUserLoggedIn) {
        favoriteIcon.addEventListener("click", handleFavoriteAction);
    }
};
// Lida com a ação de favoritar ou remover a cidade atualmente exibida.
const handleFavoriteAction = async (event) => {
    const favoriteIcon = event.currentTarget;
    const currentCity = getCurrentCityName();
    if (!currentCity) {
        showTemporaryError("Cidade não encontrada");
        return;
    }
    try {
        // Se a cidade já está favoritada, removemos; caso contrário, adicionamos.
        const isFavorite = favoriteIcon.classList.contains("fa-solid");
        const endpoint = isFavorite
            ? "/user/favorites/remove"
            : "/user/favorites/add";
        const favoriteCities = await updateFavoriteCities(endpoint, currentCity);
        // Atualiza a lista de favoritos e o ícone de favorito
        refreshFavoriteDisplay(favoriteCities);
        updateFavoriteButtonState(currentCity, favoriteCities);
    }
    catch (error) {
        handleApiError(error);
    }
};
// Comunica com a API para atualizar os favoritos.
const updateFavoriteCities = async (endpoint, cityName) => {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityName }),
        credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error("error" in data ? data.error : "Falha na operação");
    }
    if (!("favorites" in data)) {
        throw new Error("Resposta inválida: 'favorites' ausente");
    }
    return data.favorites;
};
// Atualiza a exibição da lista de favoritos utilizando o template definido no EJS.
const refreshFavoriteDisplay = (favoriteCities) => {
    const listContainer = document.getElementById("favorite-cities-list");
    if (!listContainer)
        return;
    // Limpa a lista atual
    listContainer.innerHTML = "";
    // Obtém o template de item de favorito
    const template = document.getElementById("favorite-item-template");
    if (!template)
        return;
    favoriteCities.forEach((city) => {
        // Clona o template
        const clone = template.content.cloneNode(true);
        // Preenche o nome da cidade
        const nameElement = clone.querySelector(".city-name");
        if (nameElement) {
            nameElement.textContent = city;
        }
        // Configura o botão de remoção
        const removeBtn = clone.querySelector(".remove-city-button");
        if (removeBtn) {
            removeBtn.setAttribute("data-city", city);
            removeBtn.setAttribute("aria-label", `Remover ${city} dos favoritos`);
            removeBtn.addEventListener("click", async (event) => {
                event.stopPropagation(); // Evita que o clique acione a pesquisa
                try {
                    const updatedFavorites = await updateFavoriteCities("/user/favorites/remove", city);
                    refreshFavoriteDisplay(updatedFavorites);
                    updateFavoriteButtonState(getCurrentCityName() || "", updatedFavorites);
                }
                catch (error) {
                    handleApiError(error);
                }
            });
        }
        const cityButton = clone.querySelector(".city-button");
        if (cityButton) {
            cityButton.addEventListener("click", async (event) => {
                event.stopPropagation();
                await handleCitySearch(city);
            });
        }
        listContainer.appendChild(clone);
    });
    // Atualiza a visibilidade das seções (favoritos vs. instruções)
    const favoritesContainer = document.getElementById("favorite-cities-user");
    const instructionsContainer = document.getElementById("favorite-instructions");
    if (favoriteCities.length > 0) {
        favoritesContainer && (favoritesContainer.style.display = "block");
        instructionsContainer && (instructionsContainer.style.display = "none");
    }
    else {
        favoritesContainer && (favoritesContainer.style.display = "none");
        instructionsContainer && (instructionsContainer.style.display = "block");
    }
};
// Atualiza o estado do ícone de favoritar (ao lado do título):
// se a cidade atual está nos favoritos, exibe a estrela cheia (fa-solid);
// caso contrário, exibe a estrela vazia (fa-regular).
const updateFavoriteButtonState = (currentCity, favoriteCities) => {
    const favoriteIcon = document.getElementById("favorite-icon");
    const isFavorite = favoriteCities.includes(currentCity);
    favoriteIcon?.classList.toggle("fa-solid", isFavorite);
    favoriteIcon?.classList.toggle("fa-regular", !isFavorite);
};
// Retorna o nome canônico da cidade a partir do atributo data-city do elemento #title.
const getCurrentCityName = () => {
    const titleElement = document.getElementById("title");
    return titleElement?.getAttribute("data-city") || null;
};
// Exibe uma mensagem de erro temporária.
const showTemporaryError = (message) => {
    const warnElement = document.getElementById("warn");
    if (warnElement) {
        warnElement.textContent = message;
        warnElement.style.display = "block";
        setTimeout(() => (warnElement.style.display = "none"), 3000);
    }
};
// Trata os erros da API exibindo uma mensagem.
const handleApiError = (error) => {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    showTemporaryError(message);
};
document.addEventListener("DOMContentLoaded", initializeFavoriteFeature);
