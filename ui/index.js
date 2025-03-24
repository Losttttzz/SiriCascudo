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
    document.body.classList.add("loaded");

    const buttons = document.querySelectorAll(".botao");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const targetPage = button.getAttribute("onclick").match(/'([^']+)'/)[1];

            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        });
    });
});

function iniciarJogo() {
    // Primeira tela de score com a primeira mensagem
    window.location.href = "score.html?message=" + encodeURIComponent(
        "Meu melhor funcionário Bob Esponja acabou ficando doente e não tem ninguém para fazer os hambúrgueres de siri. Preciso que você faça isso, relaxe eu vou te pagar.."
    );

    setTimeout(() => {
        window.location.href = "kitchen.html";
    }, 5000);

    setTimeout(() => {
        window.location.href = "score.html?message=" + encodeURIComponent(
            "Parabéns! Você fez um ótimo trabalho e aqui está seu pagamento!"
        );
    }, 20000);
}
