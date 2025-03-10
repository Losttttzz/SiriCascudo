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
