export function startRenderer(kitchenState) {
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
            imgElement.setAttribute('src', `../../static/assets/ingredients/${ingredient.label}-icon.png`);
            imgElement.setAttribute('alt', `Adicionar ${ingredient.name}`);
    
            ingredientElement.appendChild(imgElement);
            ingredientsListElement.appendChild(ingredientElement);
        }
    }

    function managePreparationAnimation(command) {
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
            `O primeiro cliente pediu ${kitchenState.requestedBurgers} ${kitchenState.requestedBurgers > 1 ? 'hambúrgueres' : 'hambúrguer'}.`;
    }

    function renderCounter() {
        const counterNumberElement = document.querySelector('.counter #number');
        counterNumberElement.setAttribute('src', `../../static/assets/numbers/${kitchenState.selectedBurger+1}.png`);
        counterNumberElement.setAttribute('alt', `Montando o ${kitchenState.selectedBurger+1} hambúrger`);
    }

    function renderBurgers() {
        function createPlateElement(isPlateSelected) {
            const plateElement = document.createElement('li');
            isPlateSelected ?
                plateElement.classList.add('padding-4', 'flex', 'column-reverse', 'center-vertical', 'end-horizontal', 'plate', 'selected') :
                plateElement.classList.add('padding-4', 'flex', 'column-reverse', 'center-vertical', 'end-horizontal', 'plate')
            const plateImageElement = document.createElement('img');
            plateImageElement.setAttribute('src', '../../static/assets/ingredients/plate.png');
            plateImageElement.setAttribute('alt', 'Prato');
            plateImageElement.classList.add('plate-image')
            plateElement.appendChild(plateImageElement);
            return plateElement;
        }

        function createIngredientElement(label, name, position) {
            const ingredientElement = document.createElement('img');
            ingredientElement.setAttribute('src', `../../static/assets/ingredients/${label}.png`);
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
                const ingredientElement = createIngredientElement(label, name, position);
                plateElement.appendChild(ingredientElement);
            }
        
            for(let i = 0; i < burger.ingredients.length; i++) {
                const ingredient = burger.ingredients[i];
                if(ingredient.label === 'bread') {
                    renderIngredient(`${ingredient.label}-top`, ingredient.name, burger.ingredients.length + 1);
                    renderIngredient(`${ingredient.label}-bottom`, ingredient.name, 1);
                } else {
                    const ingredientElement = createIngredientElement(ingredient.label, ingredient.name, i+1);
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
        
        const summary = document.createElement("div");
        summary.classList.add('summary');

        const order = kitchenState.burgers;

        order.forEach((burger) => {
            const ingredients = burger.ingredients;

            const burgerHeaderElement = document.createElement('div');
            burgerHeaderElement.classList.add('summary-burger-header');
            const burgerTitleElement = document.createElement('p');
            burgerTitleElement.innerText = `hambúrguer ${burger.id}`
            const burgerKcal = ingredients.reduce((acc, ing) => acc + ing.kcal, 0);
            const burgerKcalElement = document.createElement('p');
            burgerKcalElement.innerText = `${burgerKcal}kcal`;
            const burgerPrice = ingredients.reduce((acc, ing) => acc + ing.price, 0);
            const burgerPriceElement = document.createElement('p');
            burgerPriceElement.innerText = `$${burgerPrice}.00`;

            burgerHeaderElement.appendChild(burgerTitleElement);
            burgerHeaderElement.appendChild(burgerPriceElement);
            burgerHeaderElement.appendChild(burgerKcalElement);
            summary.appendChild(burgerHeaderElement);

            const counts = {};
            ingredients.forEach(({ name }) => {
                counts[name] = (counts[name] || 0) + 1;
            });

            for(const item in counts) {
                const ingredientCountElement = document.createElement('p');
                ingredientCountElement.innerText = `${counts[item]}x ${item}`;
                summary.appendChild(ingredientCountElement);
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
        
        
        content.appendChild(summary);
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
