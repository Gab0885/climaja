"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.querySelector(".form");
    const ERROR_ICON = '<i class="fa-solid fa-circle-exclamation"></i>';
    const submitButton = formElement.querySelector("button[type='submit']");
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
            const inputElement = document.getElementById(field.id);
            const containerElement = inputElement.closest(".input-box");
            let errorMessageElement = containerElement.querySelector(".error");
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
            }
            else {
                containerElement.classList.add("valid");
            }
        });
        if (isValid) {
            try {
                const formData = {
                    email: document.getElementById("email").value.trim(),
                    password: document.getElementById("password")
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
            }
            catch (error) {
                // Resetar estado visual da senha e email
                const emailContainer = document
                    .getElementById("email")
                    ?.closest(".input-box");
                const passwordContainer = document
                    .getElementById("password")
                    ?.closest(".input-box");
                throwVisualError(emailContainer);
                throwVisualError(passwordContainer);
                // Exibir erro geral
                const errorContainer = formElement.querySelector(".error-message");
                if (errorContainer) {
                    let errorMessage = "Erro desconhecido";
                    if (error instanceof Error) {
                        errorMessage = error.message;
                    }
                    errorContainer.style.display = "block";
                    errorContainer.classList.add("error");
                    errorContainer.innerHTML = `${ERROR_ICON} ${errorMessage}`;
                }
            }
            finally {
                submitButton.textContent = "Entrar";
            }
        }
    });
});
// Funções de validação
function validateLoginEmail(value) {
    if (value === "") {
        return { valid: false, message: "Digite seu e-mail!" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return { valid: false, message: "E-mail inválido!" };
    }
    return { valid: true };
}
function validateLoginPassword(value) {
    if (value === "") {
        return { valid: false, message: "Digite sua senha!" };
    }
    if (value.length < 6) {
        return { valid: false, message: "Mínimo de 6 caracteres!" };
    }
    return { valid: true };
}
function throwVisualError(container) {
    container.classList.remove("valid");
    container.classList.add("invalid");
}
