const initPasswordToggles = (): void => {
  // Seleciona todos os ícones de toggle de senha
  const icons = document.querySelectorAll<HTMLElement>(".password-icon");

  icons.forEach((icon) => {
    // Encontra o input associado ao ícone (dentro do mesmo container)
    const input = icon.parentElement?.querySelector<HTMLInputElement>("input");

    // Pula a configuração se não encontrar o input
    if (!input) return;

    // Configura o evento de click no ícone
    icon.addEventListener("click", () => {
      // Toggle entre password/text
      input.type = input.type === "password" ? "text" : "password";

      // Atualiza o ícone e a acessibilidade
      icon.classList.toggle("fa-eye");
      icon.setAttribute(
        "aria-label",
        `${input.type === "text" ? "Ocultar" : "Mostrar"} senha`
      );
    });
  });
};

// Executa a inicialização
initPasswordToggles();
