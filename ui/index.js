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
            }, 500);
        });
    });
});
