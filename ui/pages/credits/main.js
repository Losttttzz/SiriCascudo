setTimeout(() => {
    document.body.classList.add('loaded');
}, 200);

const backButtonElement = document.getElementById('back-button');
backButtonElement.addEventListener('click', navigateBack)

function navigateBack() {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        document.body.classList.remove('fade-out');
        window.history.back();
    }, 500);
}