const continueButtonElement = document.getElementById("continue-btn");
const messageElement = document.getElementById("score-message");
const params = new URLSearchParams(window.location.search);

if(params.get("status") === 'start') {
    messageElement.innerText = 
        "Meu melhor funcionário Bob Esponja acabou ficando doente e não tem ninguém para fazer os hambúrgueres de siri. Preciso que você faça isso, relaxe eu vou te pagar...";
    continueButtonElement.addEventListener("click", () => window.location.href = "kitchen.html")
} else {
    messageElement.innerText = 
        "Obrigado por me ajudar a montar os hambúrguer de siri!! Aqui seu pagamento...";
    continueButtonElement.addEventListener("click", () => {
        alert("Você recebeu 1 real!");
        window.location.href = "index.html";
    })
}
