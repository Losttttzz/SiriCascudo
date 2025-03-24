document.addEventListener("DOMContentLoaded", function () {
    const continueBtn = document.getElementById("continue-btn");

    continueBtn.addEventListener("click", function () {
        if (!localStorage.getItem("visitedKitchen")) {
            // Se ainda não passou pela cozinha, vai para kitchen.html
            localStorage.setItem("visitedKitchen", "true");
            window.location.href = "kitchen.html";
        } else {
            // Se já passou pela cozinha, exibe o alerta e volta para index.html
            alert("Você recebeu 1 real!");
            localStorage.removeItem("visitedKitchen"); // Reseta para futuras partidas
            window.location.href = "index.html";
        }
    });

    // Define a mensagem correta na tela
    const params = new URLSearchParams(window.location.search);
    const message =
        params.get("message") ||
        "Obrigado por me ajudar a montar os hambúrguer de siri!!<br>Aqui seu pagamento..";

    document.getElementById("score-message").innerHTML = message;
});
