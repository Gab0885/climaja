"use strict";
// Logica para troca de tema
const themeSwitcher = document.querySelector(".fa-solid.fa-circle-half-stroke");
if (themeSwitcher) {
    themeSwitcher.addEventListener("click", () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}
// Carrega o tema salvo ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
});
