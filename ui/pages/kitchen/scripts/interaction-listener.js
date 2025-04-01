export function startInteractionListener() {
    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of observers) {
            observerFunction(command);
        };
    }

    function setupCounter() {
        const counterBackElement = document.querySelector('.counter #back');
        const counterNextElement = document.querySelector('.counter #next');

        document.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowRight') {
                notifyAll({type: 'update-counter', command: 1})
            } else if(e.key === 'ArrowLeft') {
                notifyAll({type: 'update-counter', command: -1})
            }
        })
        counterBackElement.addEventListener('click', () => notifyAll({type: 'update-counter', command: -1})); 
        counterNextElement.addEventListener('click', () => notifyAll({type: 'update-counter', command: 1}));
    }

    function setupIngredientSelection() {
        const ingredientSelectorElements = document.getElementsByClassName('ingredient');
        for(const element of ingredientSelectorElements) {
            element.addEventListener('click', () => {
                notifyAll({
                    type: 'ingredient-selection', 
                    command: element.dataset.ingredientid,
                })
            });
        }
    }

    function setupCloseOrderButton() {
        const closeOrderButtonElement = document.getElementById('close-order');
        closeOrderButtonElement.addEventListener('click', () => notifyAll({type: 'valid-order'}));
    }

    setupCounter();
    setupIngredientSelection();
    setupCloseOrderButton();

    return {
        subscribe,
    };
}