import Order from "../model/order.js";

async function createOrder(data) {
    const order = new Order({
        name: data.name,
        character: data.character,
        burgers: data.burgers,
    })

    console.log('Trying to save order')
    const result = await order.save();
    console.log(result);
    return result;
}

async function listOrders() {
    console.log('Trying to list orders');
    const orders = await Order.find();
    console.log(`All orders: ${orders}`)
    return orders;
}

export { createOrder, listOrders };