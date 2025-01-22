// Lógica para troca de tema no aplicativo

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

// Carrega o tema salvo ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";

  // Aplica o tema salvo ou o tema padrão 'dark'
  document.documentElement.setAttribute("data-theme", savedTheme);
});
