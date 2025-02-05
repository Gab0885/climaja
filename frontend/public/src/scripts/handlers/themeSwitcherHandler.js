"use strict";
// Lógica para troca de tema via botão
const themeSwitcher = document.querySelector(".fa-solid.fa-circle-half-stroke");
// Verifica se o botão de troca de tema foi encontrado
if (themeSwitcher) {
    // Adiciona evento de clique para alternar entre temas
    themeSwitcher.addEventListener("click", () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        // Alterna entre 'light' e 'dark'
        const newTheme = currentTheme === "light" ? "dark" : "light";
        // Aplica o novo tema e salva a preferência
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}
