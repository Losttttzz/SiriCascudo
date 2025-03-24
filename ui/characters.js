document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".choose-btn");

    buttons.forEach((button, index) => {
        button.addEventListener("click", function () {
            const characterImg = button.parentElement.querySelector("img");
            const characterSrc = characterImg.src;
            const characterAlt = characterImg.alt;

            localStorage.setItem("selectedCharacter", JSON.stringify({ src: characterSrc, alt: characterAlt }));

            window.location.href = "index.html";
        });
    });
});

