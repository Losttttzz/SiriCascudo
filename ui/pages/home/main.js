// Aguarda um tempo para adicionar animação de carregamento
setTimeout(() => {
  document.body.classList.add("loaded");
}, 200);

// Atualiza o contador de moedas ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const moedaContador = document.getElementById("moeda-contador");

  let moedas = parseInt(localStorage.getItem("moedas")) || 0;

  if (moedaContador) {
    moedaContador.innerText = `💰 ${moedas}`;
  } else {
    console.error("Elemento #moeda-contador não encontrado!");
  }
});

// Captura botões
const playButtonElement = document.getElementById("play-button");
const charactersButtonElement = document.getElementById("characters-button");
const creditsButtonElement = document.getElementById("credits-button");
const historyButtonElement = document.getElementById("history-button");

// Adiciona eventos de clique
playButtonElement.addEventListener("click", () =>
  navigate("/score?status=start")
);
charactersButtonElement.addEventListener("click", () =>
  navigate("/characters")
);
creditsButtonElement.addEventListener("click", () => navigate("/credits"));
historyButtonElement.addEventListener("click", () => navigate("/history"));

function navigate(targetPage) {
  document.body.classList.add("fade-out");

  setTimeout(() => {
    document.body.classList.remove("fade-out");
    window.location.href = targetPage;
  }, 500);
}
