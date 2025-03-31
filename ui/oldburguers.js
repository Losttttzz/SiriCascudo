async function fetchBurgers() {
    try {
        const response = await fetch('http://localhost:3000/orders');
        const data = await response.json();
        
        console.log(data);

        const ordersContainer = document.getElementById('orders-container');
        ordersContainer.innerHTML = '';

        data.forEach(order => {
            displayOrderCard(order, ordersContainer);
        });
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
    }
}

function displayOrderCard(order, container) {
    const card = document.createElement('div');
    card.classList.add('order-card');

    const characterName = document.createElement('h2');
    characterName.innerText = `Pedidos feitos por: \n ${order.character.name}`;
    card.appendChild(characterName);

    const characterImage = document.createElement('img');
    characterImage.src = order.character.image;
    characterImage.alt = order.character.name;
    characterImage.style.width = "100px";
    card.appendChild(characterImage);

    order.burgers.forEach(burger => {
        const burgerCard = document.createElement('div');
        burgerCard.classList.add('burger-card');

        const burgerTitle = document.createElement('h3');
        burgerTitle.innerText = `Hamburguer - R$${burger.price}`;
        burgerCard.appendChild(burgerTitle);

        const kcal = document.createElement('p');
        kcal.innerText = `Calorias: ${burger.kcal} kcal`;
        burgerCard.appendChild(kcal);

        const ingredientsList = document.createElement('ul');
        burger.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.innerText = `${ingredient.amount}x ${ingredient.name}`;
            ingredientsList.appendChild(ingredientItem);
        });
        burgerCard.appendChild(ingredientsList);

        card.appendChild(burgerCard);
    });

    container.appendChild(card);
}

window.onload = fetchBurgers;
