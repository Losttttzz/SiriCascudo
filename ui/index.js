/**
 * Abrir pedido (varios clientes ao mesmo tempo)
 * Montar hamburger (varios hamburgeres ao mesmo tempo)
 * Fechar hamburger
 * Fechar pedido 
 * Delivery
 */

document.addEventListener("DOMContentLoaded", function () {
    const characterData = localStorage.getItem("selectedCharacter");

    if (characterData) {
        const character = JSON.parse(characterData);
        const characterContainer = document.getElementById("character-display");

        if (characterContainer) {
            characterContainer.innerHTML = `<img src="${character.src}" alt="${character.alt}">`;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Aplica o efeito de fade-in ao carregar a página
    document.body.classList.add("loaded");

    // Seleciona todos os botões que mudam de página
    const buttons = document.querySelectorAll(".botao");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Impede a navegação imediata

            const targetPage = button.getAttribute("onclick").match(/'([^']+)'/)[1];

            // Aplica o fade-out
            document.body.classList.add("fade-out");

            // Aguarda a animação antes de trocar de página
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500); // Tempo da transição (0.5s)
        });
    });
});