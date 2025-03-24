function startRenderer(kitchenState) {
    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of observers) {
            observerFunction(command);
        };
    }

    function renderIngredients() {
        const ingredientsListElement = document.querySelector('#ingredients ul');
        ingredientsListElement.innerHTML = '';

        for (let i = 0; i < kitchenState.ingredients.length; i++) {
            const ingredient = kitchenState.ingredients[i];
    
            const ingredientElement = document.createElement('li');
            ingredientElement.classList.add('bg-black', 'bg-transparent', 'border-round-4', 'clickable', 'ingredient');
            ingredientElement.setAttribute('data-ingredientid', i);
    
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', `./static/assets/ingredients/${ingredient.label}-icon.png`);
            imgElement.setAttribute('alt', `Adicionar ${ingredient.name}`);
    
            ingredientElement.appendChild(imgElement);
            ingredientsListElement.appendChild(ingredientElement);
        }
    }

    function managePreparationAnimation(command) {
        console.log(command)
        const ingredientElement = document.querySelector(`[data-ingredientid="${command.ingredientId}"]`);
        if(command.isPreparing) {
            ingredientElement.classList.add('fire');
            ingredientElement.classList.remove('clickable');
        } else {
            ingredientElement.classList.remove('fire');
            ingredientElement.classList.add('clickable');
        }
    }

    function renderSpeechBubble() {
        const speechBubbleElement = document.getElementById("speech-text");
        speechBubbleElement.textContent = 
            `O primeiro cliente pediu ${kitchenState.requestedBurgers} ${kitchenState.requestedBurgers > 1 ? 'hamburgueres' : 'hamburguer'}.`;
    }

    function renderCounter() {
        const counterNumberElement = document.querySelector('.counter #number');
        counterNumberElement.setAttribute('src', `./static/assets/numbers/${kitchenState.selectedBurger+1}.png`);
        counterNumberElement.setAttribute('alt', `Montando o ${kitchenState.selectedBurger+1} hambúrger`);
    }

    function renderBurgers() {
        function createPlateElement(isPlateSelected) {
            const plateElement = document.createElement('li');
            isPlateSelected ?
                plateElement.classList.add('padding-4', 'flex', 'column-reverse', 'center-vertical', 'end-horizontal', 'plate', 'selected') :
                plateElement.classList.add('padding-4', 'flex', 'column-reverse', 'center-vertical', 'end-horizontal', 'plate')
            const plateImageElement = document.createElement('img');
            plateImageElement.setAttribute('src', './static/assets/ingredients/plate.png');
            plateImageElement.setAttribute('alt', 'Prato');
            plateImageElement.classList.add('plate-image')
            plateElement.appendChild(plateImageElement);
            return plateElement;
        }

        function createIngredientElement(label, name, position) {
            const ingredientElement = document.createElement('img');
            ingredientElement.setAttribute('src', `./static/assets/ingredients/${label}.png`);
            ingredientElement.setAttribute('alt', name);
            ingredientElement.classList.add('ingredient-image');
            ingredientElement.style.zIndex = position;
            ingredientElement.style.bottom = `${position}rem`;
            return ingredientElement;
        }

        const burgerListElement = document.getElementById('burgers');
        burgerListElement.innerHTML = '';
        
        for(let i = 0; i < kitchenState.burgers.length; i++) {
            const burger = kitchenState.burgers[i];
            const isPlateSelected = kitchenState.selectedBurger === i;
            const plateElement = createPlateElement(isPlateSelected);

            const renderIngredient = (label, name, position) => {
                ingredientElement = createIngredientElement(label, name, position);
                plateElement.appendChild(ingredientElement);
            }
        
            for(let i = 0; i < burger.ingredients.length; i++) {
                ingredient = burger.ingredients[i];
                if(ingredient.label === 'bread') {
                    renderIngredient(`${ingredient.label}-top`, ingredient.name, burger.ingredients.length + 1);
                    renderIngredient(`${ingredient.label}-bottom`, ingredient.name, 1);
                } else {
                    ingredientElement = createIngredientElement(ingredient.label, ingredient.name, i+1);
                    plateElement.appendChild(ingredientElement);
                }
                
            }

            burgerListElement.appendChild(plateElement)
        }
    }

    function renderFeedback(message) {
        const modal = document.createElement("div");
        modal.classList.add('modal', 'bg', 'full-page', 'flex', 'center-vertical', 'center-horizontal')
        
        const content = document.createElement("div");
        content.classList.add('modal', 'content', 'padding-5', 'border-round-4')
        
        const text = document.createElement("p");
        text.innerText = message;
        
        const closeButton = document.createElement("button");
        closeButton.classList.add('secondary')
        closeButton.innerText = "Fechar";
        closeButton.onclick = () => document.body.removeChild(modal);
        
        content.appendChild(text);
        content.appendChild(closeButton);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    function renderOrderSummary() {
        const modal = document.createElement("div");
        modal.classList.add('modal', 'bg', 'full-page', 'flex', 'center-vertical', 'center-horizontal');
        
        const content = document.createElement("div");
        content.classList.add('modal', 'content', 'padding-5', 'border-round-4');
        
        const order = kitchenState.burgers;

        order.forEach((burger) => {
            const ingredients = burger.ingredients;

            const burgerHeaderElement = document.createElement('div');
            burgerHeaderElement.classList.add('summary-burger-header');
            const burgerTitleElement = document.createElement('p');
            burgerTitleElement.innerText = `Hamburger ${burger.id}`
            const burgerKcal = ingredients.reduce((acc, ing) => acc + ing.kcal, 0);
            const burgerKcalElement = document.createElement('p');
            burgerKcalElement.innerText = `${burgerKcal}kcal`;
            const burgerPrice = ingredients.reduce((acc, ing) => acc + ing.price, 0);
            const burgerPriceElement = document.createElement('p');
            burgerPriceElement.innerText = `$${burgerPrice}.00`;

            burgerHeaderElement.appendChild(burgerTitleElement);
            burgerHeaderElement.appendChild(burgerPriceElement);
            burgerHeaderElement.appendChild(burgerKcalElement);
            content.appendChild(burgerHeaderElement);

            const counts = {};
            ingredients.forEach(({ name }) => {
                counts[name] = (counts[name] || 0) + 1;
            });

            for(const item in counts) {
                const ingredientCountElement = document.createElement('p');
                ingredientCountElement.innerText = `${counts[item]}x ${item}`;
                content.appendChild(ingredientCountElement);
            }
        })
        
        const closeButton = document.createElement("button");
        closeButton.classList.add('secondary')
        closeButton.innerText = "Cancelar";
        closeButton.onclick = () => document.body.removeChild(modal);

        const confirmButton = document.createElement("button");
        confirmButton.classList.add('secondary', 'bg-green');
        confirmButton.innerText = "Confirmar";
        confirmButton.onclick = () => {
            notifyAll({type: 'confirm-order'});
            document.body.removeChild(modal);
        };
        
        content.appendChild(closeButton);
        content.appendChild(confirmButton);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    function renderScreen() {
        renderIngredients();
        renderCounter();
        renderSpeechBubble();
        renderBurgers();
    }

    function handleNotification(notification) {
        const actions = {
            'update-burgers': () => renderBurgers(),
            'update-counter': () => {renderCounter(); renderBurgers()},
            'feedback': (command) => renderFeedback(command),
            'update-ingredient-preparation': (command) => managePreparationAnimation(command),
            'close-order': () => renderOrderSummary(),
        }
        if(actions[notification.type]) {
            actions[notification.type](notification.command)
        }
    }

    return {
        renderScreen,
        handleNotification,
        subscribe,
    }
}

function startInteractionListener() {
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
        closeOrderButtonElement.addEventListener('click', () => notifyAll({type: 'close-order'}));
    }

    setupCounter();
    setupIngredientSelection();
    setupCloseOrderButton();

    return {
        subscribe,
    };
}

function startKitchen(requestedBurgers) {
    const state = {
        ingredients:  [
            {
                name: 'Pão',
                label: 'bread',
                price: 5,
                kcal: 227,
                min: 1,
                max: 1,
            },
            {
                name: 'Hambúrger',
                label: 'meat',
                price: 15,
                kcal: 280,
                min: 1,
                max: 3,
            },
            {
                name: 'Queijo',
                label: 'cheese',
                price: 2,
                kcal: 55,
                min: 0,
                max: 5,
            },
            {
                name: 'Alface',
                label: 'lettuce',
                price: 2,
                kcal: 5,
                min: 0,
                max: 5,
            },
            {
                name: 'Tomate',
                label: 'tomato',
                price: 1,
                kcal: 2,
                min: 0,
                max: 5,
            },
            {
                name: 'Picles',
                label: 'pickles',
                price: 1,
                kcal: 15,
                min: 0,
                max: 1000,
            },
        ],
        requestedBurgers: requestedBurgers,
        burgers: Array.from({ length: requestedBurgers }, (_, i) => ({
            id: i + 1,
            ingredients: [],
        })),
        selectedBurger: 0,
        isMeatFrying: false,
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of observers) {
            observerFunction(command);
        };
    }

    async function addIngredient(ingredientId) {
        const ingredient = state.ingredients[ingredientId];
        const selectedBurger = state.burgers[state.selectedBurger];
        const updatedIngredients = [...selectedBurger.ingredients, ingredient];
    
        if (!validateIngredients(updatedIngredients, ingredient.label)) return;
    
        if (ingredient.label === 'meat') {
            if (state.isMeatFrying) return;
            state.isMeatFrying = true;
            try {
                notifyAll({type: 'update-ingredient-preparation', command: {ingredientId: 1, isPreparing: true}});
                await fryBurger();
                selectedBurger.ingredients.push(ingredient);
            } finally {
                state.isMeatFrying = false;
                notifyAll({type: 'update-ingredient-preparation', command: {ingredientId: 1, isPreparing: false}});
            }
        } else {
            if (ingredient.label === 'bread') {
                selectedBurger.ingredients.unshift({
                    name: ingredient.name,
                    label: ingredient.label,
                    price: ingredient.price,
                    kcal: ingredient.kcal,
                });
            } else {
                selectedBurger.ingredients.push({
                    name: ingredient.name,
                    label: ingredient.label,
                    price: ingredient.price,
                    kcal: ingredient.kcal,
                });
            }
        }
    
        notifyAll({ type: 'update-burgers' });
    }

    function fryBurger() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 3000)
        })
    }

    function updateCounter(command) {
        const newValue = state.selectedBurger + command;
        if(newValue >= 0 && newValue < requestedBurgers) {
            state.selectedBurger = newValue;

            notifyAll({type: 'update-counter'})
        }
    }

    function closeOrder() {
        state.burgers.forEach((burger) => {
            if(!validateIngredients(burger.ingredients)) {
                return;
            }

            notifyAll({type: 'close-order'});
        });
    }

    function validateIngredients(ingredients, specificIngredient) {
        const counts = {};
        state.ingredients.forEach(({ label }) => {
            counts[label] = 0;
        })
        ingredients.forEach(({ label }) => {
            counts[label] = counts[label] + 1;
        });
    
        const errors = [];
        state.ingredients.forEach(({ label, name, min, max }) => {
            if (!specificIngredient || specificIngredient === label) {
                const count = counts[label];
                if (count < min) {
                    errors.push(`Todos os hamburgers devem ter no mínimo ${min} ${(min > 1 ? name + 's' : name).toLowerCase()}`);
                } else if (count > max) {
                    errors.push(`O hamburger deve ter no máximo ${max} ${(max > 1 ? name + 's' : name).toLowerCase()}`);
                }
            }
        });
    
        if(errors.length > 0) {
            notifyAll({type: 'feedback', command: errors[0]});
            return false;
        } else {
            return true;
        }
    }

    function handleNotification(notification) {
        const actions = {
            'update-counter': (command) => updateCounter(command),
            'ingredient-selection': (command) => addIngredient(command),
            'close-order': () => closeOrder(),
        }
        if(actions[notification.type]) {
            actions[notification.type](notification.command)
        }
    }

    return {
        state,
        subscribe,
        handleNotification,
    };
}

function createHttpService() {

    function handleNotification(notification) {
        const actions = {
            'confirm-order': () => {},
        }
        if(actions[notification.type]) {
            actions[notification.type](notification.command)
        }
    }

    return {
        handleNotification,
    };
}

const requestedBurgers = Math.ceil(Math.random() * 5)
const kitchen = startKitchen(requestedBurgers);

const renderer = startRenderer(kitchen.state);

renderer.renderScreen();
const interactions = startInteractionListener();

const httpService = createHttpService();

kitchen.subscribe(renderer.handleNotification);
interactions.subscribe(kitchen.handleNotification);
renderer.subscribe(httpService.handleNotification);