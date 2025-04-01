const backButtonElement = document.getElementById('back-button');
backButtonElement.addEventListener('click', navigateBack)

function navigateBack() {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        document.body.classList.remove('fade-out');
        window.history.back();
    }, 500);
}

async function fetchBurgers() {
    await fetch('http://localhost:3000/orders')
        .then(response => response.json())
        .then(data => {
            data.forEach(order => {
                displayOrderCard(order, ordersContainer);
            });
        })
        .catch(err => console.error('Erro ao buscar pedidos:', err));
}

function displayOrderCard(order, container) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('order-card', 'flex', 'column', 'bg-white', 'border-round-2', 'padding-4');

    const characterNameElement = document.createElement('h2');
    characterNameElement.classList.add('font-big', 'bold', 'dark-blue')
    characterNameElement.innerText = `Pedido feito por: \n ${order.character.name}`;
    
    const characterImageElement = document.createElement('img');
    characterImageElement.src = order.character.imagePath;
    characterImageElement.alt = order.character.name;
    
    cardElement.appendChild(characterNameElement);
    cardElement.appendChild(characterImageElement);
    
    order.burgers.forEach(burger => {
        const burgerCard = document.createElement('div');
        burgerCard.classList.add('burger-card', 'bg-light-gray', 'border-round-2', 'padding-2');
        
        const burgerTitle = document.createElement('h3');
        burgerTitle.classList.add('font-big', 'black');
        burgerTitle.innerText = `hambúrguer - R$${burger.price}`;
        
        const kcal = document.createElement('p');
        kcal.classList.add('font-small', 'black');
        kcal.innerText = `Calorias: ${burger.kcal} kcal`;
        
        const ingredientsList = document.createElement('ul');
        burger.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.classList.add('font-small', 'gray');
            ingredientItem.innerText = `${ingredient.amount}x ${ingredient.name}`;
            ingredientsList.appendChild(ingredientItem);
        });

        burgerCard.appendChild(burgerTitle);
        burgerCard.appendChild(kcal);
        burgerCard.appendChild(ingredientsList);
        cardElement.appendChild(burgerCard);
    });

    container.appendChild(cardElement);
}

const ordersContainer = document.getElementById('orders-container');
ordersContainer.innerHTML = '';
fetchBurgers();
