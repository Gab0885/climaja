import { handleCitySearch } from "./citySearchHandler.js";
import { updateFavoriteCities } from "../services/favoriteApi.js";
// Inicializa a funcionalidade de favoritos:
// - Se o usuário estiver logado, associa o evento de clique ao ícone de favoritar.
// - Configura a delegação de eventos para os botões de remoção.
const initializeFavoriteFeature = () => {
    const favoriteIcon = document.getElementById("favorite-icon");
    const isUserLoggedIn = !!document.getElementById("userName");
    if (favoriteIcon && isUserLoggedIn) {
        favoriteIcon.addEventListener("click", handleFavoriteAction);
    }
    // Delegação de eventos para remoção de cidades da lista de favoritos.
    const listContainer = document.getElementById("favorite-cities-list");
    if (listContainer) {
        listContainer.addEventListener("click", handleRemoveCityClick);
    }
};
// Manipulador de clique para remoção de uma cidade dos favoritos.
const handleRemoveCityClick = async (e) => {
    const target = e.target;
    const removeButton = target.closest(".remove-city-button");
    if (!removeButton)
        return;
    e.stopPropagation();
    const city = removeButton.getAttribute("data-city");
    if (!city)
        return;
    try {
        const updatedFavorites = await updateFavoriteCities("/user/favorites/remove", city);
        refreshFavoriteDisplay(updatedFavorites);
        const currentCity = getCurrentCityName();
        if (currentCity) {
            updateFavoriteButtonState(currentCity, updatedFavorites);
        }
    }
    catch (error) {
        handleApiError(error);
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
    // Evita cliques duplicados durante a requisição.
    favoriteIcon.setAttribute("disabled", "true");
    try {
        // Se a cidade já estiver favoritada (classe "fa-solid"), removemos; caso contrário, adicionamos.
        const isFavorite = favoriteIcon.classList.contains("fa-solid");
        const endpoint = isFavorite ? "/user/favorites/remove" : "/user/favorites/add";
        const favoriteCities = await updateFavoriteCities(endpoint, currentCity);
        refreshFavoriteDisplay(favoriteCities);
        updateFavoriteButtonState(currentCity, favoriteCities);
    }
    catch (error) {
        handleApiError(error);
    }
    finally {
        favoriteIcon.removeAttribute("disabled");
    }
};
// Atualiza a exibição da lista de favoritos utilizando o template definido.
const refreshFavoriteDisplay = (favoriteCities) => {
    const listContainer = document.getElementById("favorite-cities-list");
    if (!listContainer)
        return;
    // Limpa a lista atual.
    listContainer.innerHTML = "";
    // Obtém o template de item de favorito.
    const template = document.getElementById("favorite-item-template");
    if (!template)
        return;
    // Utiliza um DocumentFragment para melhor performance.
    const fragment = document.createDocumentFragment();
    favoriteCities.forEach((city) => {
        // Clona o conteúdo do template.
        const clone = template.content.cloneNode(true);
        // Preenche o nome da cidade.
        const nameElement = clone.querySelector(".city-name");
        if (nameElement) {
            nameElement.textContent = city;
        }
        // Configura o botão de remoção.
        const removeBtn = clone.querySelector(".remove-city-button");
        if (removeBtn) {
            removeBtn.setAttribute("data-city", city);
            removeBtn.setAttribute("aria-label", `Remover ${city} dos favoritos`);
        }
        // Configura o botão para buscar a cidade.
        const cityButton = clone.querySelector(".city-button");
        if (cityButton) {
            cityButton.addEventListener("click", async (e) => {
                e.stopPropagation();
                await handleCitySearch(city);
            });
        }
        fragment.appendChild(clone);
    });
    listContainer.appendChild(fragment);
    // Atualiza a visibilidade dos containers de favoritos e instruções.
    const favoritesContainer = document.getElementById("favorite-cities-user");
    const instructionsContainer = document.getElementById("favorite-instructions");
    if (favoriteCities.length > 0) {
        if (favoritesContainer)
            favoritesContainer.style.display = "block";
        if (instructionsContainer)
            instructionsContainer.style.display = "none";
    }
    else {
        if (favoritesContainer)
            favoritesContainer.style.display = "none";
        if (instructionsContainer)
            instructionsContainer.style.display = "block";
    }
};
// Atualiza o estado do ícone de favoritar (exibe estrela cheia ou vazia).
const updateFavoriteButtonState = (currentCity, favoriteCities) => {
    const favoriteIcon = document.getElementById("favorite-icon");
    if (!favoriteIcon)
        return;
    const isFavorite = favoriteCities.includes(currentCity);
    favoriteIcon.classList.toggle("fa-solid", isFavorite);
    favoriteIcon.classList.toggle("fa-regular", !isFavorite);
};
// Retorna o nome da cidade a partir do atributo data-city do elemento #title.
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
        setTimeout(() => {
            warnElement.style.display = "none";
        }, 3000);
    }
};
// Trata os erros da API exibindo uma mensagem e registrando o erro no console.
const handleApiError = (error) => {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    showTemporaryError(message);
};
document.addEventListener("DOMContentLoaded", initializeFavoriteFeature);
