setTimeout(() => {
    document.body.classList.add('loaded');
}, 200);

const playButtonElement = document.getElementById('play-button');
const charactersButtonElement = document.getElementById('characters-button');
const creditsButtonElement = document.getElementById('credits-button');

playButtonElement.addEventListener('click', () => navigate('/score?status=start'));
charactersButtonElement.addEventListener('click', () => navigate('/characters'));
creditsButtonElement.addEventListener('click', () => navigate('/credits'));

function navigate(targetPage) {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        document.body.classList.remove('fade-out');
        window.location.href = targetPage;
    }, 500);
}