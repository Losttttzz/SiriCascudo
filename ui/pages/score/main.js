document.addEventListener("DOMContentLoaded", () => {
  const continueButtonElement = document.getElementById("continue-button");
  const messageElement = document.getElementById("score-message");
  const params = new URLSearchParams(window.location.search);
  const coins = parseInt(localStorage.getItem("coins")) || 0;

  if (params.get("status") === "start") {
    messageElement.innerText =
      "Meu melhor funcionário Bob Esponja acabou ficando doente e não tem ninguém para fazer os hambúrgueres de siri. Preciso que você faça isso, mas relaxe eu vou te pagar...";
    continueButtonElement.addEventListener(
      "click",
      () => (window.location.href = "/kitchen")
    );
  } else {
    messageElement.innerText =
      "Obrigado por me ajudar a montar os hambúrgueres de siri!! Aqui seu pagamento...";
    continueButtonElement.addEventListener("click", () => {

      alert("Você recebeu 1 real!");
      localStorage.setItem("coins", coins + 1);

      setTimeout(() => {
        window.location.href = "/home";
      }, 500);
    });
  }
});
