export function startKitchen(requestedBurgers) {
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
        let isOrderValid = true;
        for (const burger of state.burgers) {
            if (!validateIngredients(burger.ingredients)) {
                isOrderValid = false;
                break;
            }
        }
        if(isOrderValid) {
            notifyAll({type: 'close-order'});
        }
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
                    errors.push(`Todos os hambúrguers devem ter no mínimo ${min} ${(min > 1 ? name + 's' : name).toLowerCase()}`);
                } else if (count > max) {
                    errors.push(`O hambúrguer deve ter no máximo ${max} ${(max > 1 ? name + 's' : name).toLowerCase()}`);
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

    function createOrderPayload() {
        const characterData = localStorage.getItem("selectedCharacter");
        const character = JSON.parse(characterData);

        const burgers = state.burgers.map(burger => {
            const ingredientMap = new Map();
            let totalPrice = 0;
            let totalKcal = 0;
    
            burger.ingredients.forEach(ingredient => {
                const { name, price, kcal, label } = ingredient;
                const amount = ingredient.min || 1;
    
                if (ingredientMap.has(label)) {
                    ingredientMap.get(label).amount += amount;
                } else {
                    ingredientMap.set(label, { name, amount });
                }
    
                totalPrice += price * amount;
                totalKcal += kcal * amount;
            });
    
            return {
                price: totalPrice,
                kcal: totalKcal,
                ingredients: Array.from(ingredientMap.values())
            };
        });

        const orderPayload = {
            character: {
                name: character.name,
                imagePath: character.imagePath,
            },
            burgers: burgers
        };

        notifyAll({type: 'save-order', command: {payload: orderPayload, callback: window.location.href = '/score?status=end'}});
    }

    function handleNotification(notification) {
        const actions = {
            'update-counter': (command) => updateCounter(command),
            'ingredient-selection': (command) => addIngredient(command),
            'valid-order': () => closeOrder(),
            'confirm-order': () => createOrderPayload()
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
