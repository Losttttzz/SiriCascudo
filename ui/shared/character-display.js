document.addEventListener("DOMContentLoaded", loadCharacter);
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        loadCharacter();
    }
});

function loadCharacter() {
    const characterData = localStorage.getItem("selectedCharacter");

    if (characterData) {
        const character = JSON.parse(characterData);
        const characterContainer = document.getElementById("character-display");

        if (characterContainer) {
            characterContainer.innerHTML = `<img src="${character.imagePath}" alt="${character.name}">`;
        }
    }
}