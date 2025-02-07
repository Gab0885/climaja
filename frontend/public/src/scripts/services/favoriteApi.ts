export type FavoriteData = { favorites: string[] };
export type ErrorData = { error: string };
export type ApiResponse = FavoriteData | ErrorData;


// Comunica com a API para atualizar os favoritos.

export const updateFavoriteCities = async (
  endpoint: string,
  cityName: string
): Promise<string[]> => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
    credentials: "include",
  });

  let data: ApiResponse;
  try {
    data = await response.json();
  } catch (e) {
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
