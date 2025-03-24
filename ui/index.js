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

function iniciarJogo() {
    // Primeira tela de score com a primeira mensagem
    window.location.href = "score.html?message=" + encodeURIComponent(
        "Meu melhor funcionário Bob Esponja acabou ficando doente e não tem ninguém para fazer os hambúrgueres de siri. Preciso que você faça isso, relaxe eu vou te pagar.."
    );

    // Após 5 segundos, leva para a cozinha
    setTimeout(() => {
        window.location.href = "kitchen.html";
    }, 5000); // 5 segundos na tela de score

    // Após mais 15 segundos (tempo para jogar), leva para a tela de score final
    setTimeout(() => {
        window.location.href = "score.html?message=" + encodeURIComponent(
            "Parabéns! Você fez um ótimo trabalho e aqui está seu pagamento!"
        );
    }, 20000);
}
