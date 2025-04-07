setTimeout(() => {
  document.body.classList.add("loaded");
}, 200);

document.addEventListener("DOMContentLoaded", renderCoins());
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
      renderCoins();
  }
});

const playButtonElement = document.getElementById("play-button");
const charactersButtonElement = document.getElementById("characters-button");
const creditsButtonElement = document.getElementById("credits-button");
const historyButtonElement = document.getElementById("history-button");

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

function renderCoins() {
  const coinCounter = document.getElementById("coin-counter");
  const coins = parseInt(localStorage.getItem("coins")) || 0;
  coinCounter.innerText = `💰 ${coins}`;
}