"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.querySelector(".form");
    const ERROR_ICON = '<i class="fa-solid fa-circle-exclamation"></i>';
    const submitButton = formElement.querySelector("button[type='submit']");
    const fieldsToValidate = [
        {
            id: "name",
            label: "Nome",
            validate: validateName,
        },
        {
            id: "email",
            label: "E-mail",
            validate: validateEmail,
        },
        {
            id: "password",
            label: "Senha",
            validate: validatePassword,
        },
        {
            id: "confirm_password",
            label: "Confirmar senha",
            validate: validatePasswordConfirmation,
        },
    ];
    formElement.addEventListener("submit", async (e) => {
        e.preventDefault();
        let isValid = true;
        fieldsToValidate.forEach((field) => {
            const inputElement = document.getElementById(field.id);
            const containerElement = inputElement.closest(".input-box");
            let errorMessageElement = containerElement.querySelector(".error");
            const value = inputElement.value.trim();
            // Cria elemento de erro se não existir
            if (!errorMessageElement) {
                errorMessageElement = document.createElement("div");
                errorMessageElement.classList.add("error");
                containerElement.appendChild(errorMessageElement);
            }
            // Limpar estados anteriores
            errorMessageElement.innerHTML = "";
            containerElement.classList.remove("invalid", "valid");
            // Executar validação
            const validationResult = field.validate(value);
            if (!validationResult.valid) {
                errorMessageElement.innerHTML = `${ERROR_ICON} ${validationResult.message}`;
                containerElement.classList.add("invalid");
                isValid = false;
            }
            else {
                containerElement.classList.add("valid");
            }
        });
        if (isValid) {
            try {
                // Coletar dados do formulário (incluindo confirmação de senha)
                const formData = {
                    name: document.getElementById("name").value.trim(),
                    email: document.getElementById("email").value.trim(),
                    password: document.getElementById("password")
                        .value,
                    confirm_password: document.getElementById("confirm_password").value,
                };
                // Enviar requisição
                const response = await fetch("/user/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                // Tratar erro HTTP
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Erro no registro");
                }
                // Salvar token e redirecionar
                const { token } = await response.json();
                localStorage.setItem("authToken", token);
                window.location.href = "/";
            }
            catch (error) {
                // Mostrar erro para o usuário
                const errorContainer = formElement.querySelector(".error-message");
                if (errorContainer) {
                    let errorMessage = "Erro desconhecido";
                    // Verificar se é uma instância de Error
                    if (error instanceof Error) {
                        errorMessage = error.message;
                    }
                    errorContainer.style.display = "block";
                    errorContainer.classList.add("error");
                    errorContainer.innerHTML = `${ERROR_ICON} ${errorMessage}`;
                }
            }
            finally {
                // Restaurar texto do botão
                submitButton.textContent = "Cadastrar";
            }
        }
    });
});
// Funções de validação
function validateName(value) {
    if (value === "") {
        return { valid: false, message: "Este campo é obrigatório!" };
    }
    if (value.length < 3) {
        return { valid: false, message: "Mínimo de 3 caracteres!" };
    }
    if (!/^[a-zA-ZÀ-ú ]+$/.test(value)) {
        return { valid: false, message: "Use apenas letras!" };
    }
    return { valid: true };
}
function validateEmail(value) {
    if (value === "") {
        return { valid: false, message: "E-mail obrigatório!" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return { valid: false, message: "E-mail inválido!" };
    }
    return { valid: true };
}
function validatePassword(value) {
    if (value === "") {
        return { valid: false, message: "Senha obrigatória!" };
    }
    if (value.length < 6 || value.length > 50) {
        return { valid: false, message: "Senha deve ter pelo menos 6 caracteres!" };
    }
    return { valid: true };
}
function validatePasswordConfirmation(value) {
    if (value === "") {
        return { valid: false, message: "Confirme sua senha!" };
    }
    const passwordValue = document.getElementById("password").value;
    if (value !== passwordValue) {
        return { valid: false, message: "As senhas não coincidem!" };
    }
    return { valid: true };
}
