import { 
    createOrder, 
    listOrders 
} from '../database/repository/order-repository.js';
import express from 'express'

const createOrderRoute = async (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({ error: 'Order data is required' });
    }
    
    const newOrder = await createOrder(data);
    res.status(201).json(newOrder);
}

const listOrdersRoute = async (req, res) => {
    const orders = await listOrders();

    if (orders.length === 0) {
        return res.status(404).json();
    }

    res.json(orders);
};

const router = express.Router();
router.post('/', createOrderRoute);
router.get('/', listOrdersRoute); 

export default router;