document.addEventListener("DOMContentLoaded", function () {
    const continueBtn = document.getElementById("continue-btn");

    continueBtn.addEventListener("click", function () {
        if (!localStorage.getItem("visitedKitchen")) {
            localStorage.setItem("visitedKitchen", "true");
            window.location.href = "kitchen.html";
        } else {
            alert("Você recebeu 1 real!");
            localStorage.removeItem("visitedKitchen");
            window.location.href = "index.html";
        }
    });

    const params = new URLSearchParams(window.location.search);
    const message =
        params.get("message") ||
        "Obrigado por me ajudar a montar os hambúrguer de siri!!<br>Aqui seu pagamento..";

    document.getElementById("score-message").innerHTML = message;
});
