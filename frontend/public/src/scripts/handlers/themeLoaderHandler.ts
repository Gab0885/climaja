// Carrega o tema salvo ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";

  // Aplica o tema salvo ou o tema padrão 'dark'
  document.documentElement.setAttribute("data-theme", savedTheme);
});
