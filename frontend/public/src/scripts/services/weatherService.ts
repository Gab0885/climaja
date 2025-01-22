// Função assíncrona para buscar dados de previsão do tempo para uma cidade
export async function getWeather(cityName: string) {
  const apiUrl = `/api/weather?city=${encodeURIComponent(cityName)}`;

  try {
    // Faz a requisição à API de previsão do tempo
    const response = await fetch(apiUrl);

    // Lança erro se a resposta não for bem-sucedida
    if (!response.ok) throw new Error("Erro ao buscar dados da previsão do tempo.");

    // Retorna os dados da resposta em formato JSON
    return await response.json();
  } catch (error: unknown) {
    // Verifica se o erro tem a propriedade 'message' e lança um erro apropriado
    if (error instanceof Error) {
      console.error("Erro ao buscar dados:", error);
      throw new Error(error.message || "Erro desconhecido.");
    }
    
    // Lida com erros desconhecidos que não são instâncias de Error
    console.error("Erro desconhecido ao buscar dados.");
    throw new Error("Erro desconhecido.");
  }
}