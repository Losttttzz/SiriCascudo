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
            }, 500); x
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
