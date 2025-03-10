document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os botões "Escolher"
    const buttons = document.querySelectorAll(".choose-btn");

    buttons.forEach((button, index) => {
        button.addEventListener("click", function () {
            // Seleciona a imagem do personagem correspondente
            const characterImg = button.parentElement.querySelector("img");
            const characterSrc = characterImg.src; // Caminho da imagem
            const characterAlt = characterImg.alt; // Nome do personagem

            // Salva no localStorage
            localStorage.setItem("selectedCharacter", JSON.stringify({ src: characterSrc, alt: characterAlt }));

            // Redireciona para a página inicial
            window.location.href = "index.html";
        });
    });
});

