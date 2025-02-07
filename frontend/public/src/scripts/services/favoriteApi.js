// Comunica com a API para atualizar os favoritos.
export const updateFavoriteCities = async (endpoint, cityName) => {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityName }),
        credentials: "include",
    });
    let data;
    try {
        data = await response.json();
    }
    catch (e) {
        throw new Error("Resposta inválida do servidor");
    }
    if (!response.ok) {
        const errorMessage = "error" in data ? data.error : "Falha na operação";
        throw new Error(errorMessage);
    }
    if (!("favorites" in data)) {
        throw new Error("Resposta inválida: 'favorites' ausente");
    }
    return data.favorites;
};
