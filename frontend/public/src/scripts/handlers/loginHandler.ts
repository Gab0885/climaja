document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector(".form") as HTMLFormElement;
  const ERROR_ICON = '<i class="fa-solid fa-circle-exclamation"></i>';
  const submitButton = formElement.querySelector(
    "button[type='submit']"
  ) as HTMLButtonElement;

  const fieldsToValidate = [
    {
      id: "email",
      label: "E-mail",
      validate: validateLoginEmail,
      allowValid: true,
    },
    {
      id: "password",
      label: "Senha",
      validate: validateLoginPassword,
      allowValid: false,
    },
  ];

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const inputElement = document.getElementById(
        field.id
      ) as HTMLInputElement;
      const containerElement = inputElement.closest(
        ".input-box"
      ) as HTMLElement;
      let errorMessageElement = containerElement.querySelector(
        ".error"
      ) as HTMLElement;
      const value = inputElement.value.trim();

      if (!errorMessageElement) {
        errorMessageElement = document.createElement("div");
        errorMessageElement.classList.add("error");
        containerElement.appendChild(errorMessageElement);
      }

      errorMessageElement.innerHTML = "";
      containerElement.classList.remove("invalid", "valid");

      const validationResult = field.validate(value);

      if (!validationResult.valid) {
        errorMessageElement.innerHTML = `${ERROR_ICON} ${validationResult.message}`;
        containerElement.classList.add("invalid");
        isValid = false;
      } else {
        containerElement.classList.add("valid");
      }
    });

    if (isValid) {
      try {
        const formData = {
          email: (
            document.getElementById("email") as HTMLInputElement
          ).value.trim(),
          password: (document.getElementById("password") as HTMLInputElement)
            .value,
        };

        const response = await fetch("/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Credenciais inválidas");
        }

        window.location.href = "/";
      } catch (error) {
        // Resetar estado visual da senha
        const passwordContainer = document
          .getElementById("password")
          ?.closest(".input-box") as HTMLElement;
        passwordContainer?.classList.remove("valid");
        passwordContainer?.classList.add("invalid");

        // Exibir erro geral
        const errorContainer = formElement.querySelector(
          ".error-message"
        ) as HTMLElement;

        if (errorContainer) {
          let errorMessage = "Erro desconhecido";

          if (error instanceof Error) {
            errorMessage = error.message;
          }

          errorContainer.style.display = "block";
          errorContainer.classList.add("error");
          errorContainer.innerHTML = `${ERROR_ICON} ${errorMessage}`;
        }
      } finally {
        submitButton.textContent = "Entrar";
      }
    }
  });
});

// Funções de validação
function validateLoginEmail(value: string) {
  if (value === "") {
    return { valid: false, message: "Digite seu e-mail!" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return { valid: false, message: "E-mail inválido!" };
  }

  return { valid: true };
}

function validateLoginPassword(value: string) {
  if (value === "") {
    return { valid: false, message: "Digite sua senha!" };
  }

  if (value.length < 6) {
    return { valid: false, message: "Mínimo de 6 caracteres!" };
  }

  return { valid: true };
}
