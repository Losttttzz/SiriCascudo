document.addEventListener("DOMContentLoaded", function () {
    // Aplica o efeito de fade-in ao carregar a página
    document.body.classList.add("loaded");

    // Seleciona todos os links ou botões que mudam de página
    const buttons = document.querySelectorAll("button, a");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Impede a navegação imediata

            const targetPage = button.getAttribute("onclick")?.match(/'([^']+)'/)?.[1] || button.href;

            if (targetPage) {
                // Aplica o fade-out
                document.body.classList.add("fade-out");

                // Aguarda a animação antes de trocar de página
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 500); // Tempo da transição (0.5s)
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Gera um número aleatório entre 1 e 5
    let numeroAleatorio = Math.floor(Math.random() * 5) + 1;
    
    // Define o texto do balão de fala
    document.getElementById("speech-text").textContent = `Eu gostaria de ${numeroAleatorio} hambúrguer`;
});
