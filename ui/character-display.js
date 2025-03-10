document.addEventListener("DOMContentLoaded", function () {
    const characterData = localStorage.getItem("selectedCharacter");

    if (characterData) {
        const character = JSON.parse(characterData);
        const characterContainer = document.getElementById("character-display");

        if (characterContainer) {
            characterContainer.innerHTML = `<img src="${character.src}" alt="${character.alt}">`;
        }
    }
});