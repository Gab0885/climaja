// Exibe ou oculta o aviso com uma mensagem opcional
export const toggleWarning = (message) => {
    const warnElement = document.querySelector("#warn");
    if (warnElement) {
        // Define a mensagem ou limpa o texto
        warnElement.textContent = message || "";
        // Adiciona ou remove a classe 'show' com base na presença da mensagem
        warnElement.classList.toggle("show", !!message);
    }
};
// Limpa a interface de clima (oculta o card de clima)
export const clearWeatherUI = () => {
    document.querySelector("#weather")?.classList.remove("show");
};
