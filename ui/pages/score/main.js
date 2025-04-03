document.addEventListener("DOMContentLoaded", () => {
  const moedaContador = document.getElementById("moeda-contador");
  const continueButtonElement = document.getElementById("continue-button");
  const messageElement = document.getElementById("score-message");
  const params = new URLSearchParams(window.location.search);
  let moedas = parseInt(localStorage.getItem("moedas")) || 0;

  if (moedaContador) {
    moedaContador.innerText = `💰 ${moedas}`;
  } else {
    console.error("Elemento #moeda-contador não encontrado!");
  }

  if (continueButtonElement) {
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

        // Atualiza as moedas no localStorage
        moedas += 1;
        localStorage.setItem("moedas", moedas);

        // Atualiza a interface antes de redirecionar
        if (moedaContador) {
          moedaContador.innerText = `💰 ${moedas}`;
        } else {
          console.error(
            "Elemento #moeda-contador não encontrado ao tentar atualizar!"
          );
        }

        // Pequeno atraso para garantir que a atualização apareça antes do redirecionamento
        setTimeout(() => {
          window.location.href = "/home";
        }, 500);
      });
    }
  } else {
    console.error("Elemento #continue-button não encontrado!");
  }
});
