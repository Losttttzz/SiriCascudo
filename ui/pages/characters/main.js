const characters = [
    {
        name: 'Patrick',
        label: 'Patrick',
        imagePath: '../../static/assets/characters/patrick.png',
    },
    {
        name: 'Sandy',
        label: 'Sandy',
        imagePath: '../../static/assets/characters/sandy.png',
    },
    {
        name: 'Lula Molusco',
        label: 'Squidward',
        imagePath: '../../static/assets/characters/squidward.png',
    },
    {
        name: 'Água Viva',
        label: 'Jellyfish',
        imagePath: '../../static/assets/characters/jellyfish.png',
    },
    {
        name: 'Plancton',
        label: 'Plankton',
        imagePath: '../../static/assets/characters/plankton.png',
    },
    {
        name: 'Gary',
        label: 'Gary',
        imagePath: '../../static/assets/characters/gary.png',
    },
];

function renderCharacterCards() {
    const containerElement = document.getElementById('card-container');

    characters.forEach(character => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'flex', 'column', 'center-vertical', 'center-horizontal', 'bg-white', 'padding-4', 'border-round-2');

        const characterImageElement = document.createElement('img');
        characterImageElement.setAttribute('src', character.imagePath);
        characterImageElement.setAttribute('alt', character.name);

        const characterSelectButtonElement = document.createElement('button');
        characterSelectButtonElement.innerText = 'Escolher';
        characterSelectButtonElement.classList.add('primary');
        characterSelectButtonElement.addEventListener('click', () => {
            setCharacter({
                name: characterImageElement.alt,
                imagePath: characterImageElement.src,
            });
            navigateBack();
        })

        cardElement.appendChild(characterImageElement);
        cardElement.appendChild(characterSelectButtonElement);
        containerElement.appendChild(cardElement);
    });
}

function setCharacter(data) {
    localStorage.setItem("selectedCharacter", JSON.stringify(data));
}

function navigateBack() {
    window.history.back();
}

const backButtonElement = document.getElementById('back-button');
backButtonElement.addEventListener('click', navigateBack);

renderCharacterCards();


