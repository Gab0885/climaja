export async function getWeather(cityName) {
    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da previsão do tempo.");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Erro ao buscar dados da previsão do tempo:", error);
        const errorMessage = error.message || "Erro desconhecido ao buscar dados.";
        throw new Error(errorMessage);
    }
}
