import { 
    createOrder, 
    listOrders 
} from '../database/repository/order-repository.js';
import express from 'express'

const createOrderRoute = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Order data is required' });
    }
    
    createOrder(data);
    res.status(201).json(newUser);
}

const listOrdersRoute = (req, res) => {
    const orders = listOrders();
    res.json(orders);
};

const router = express.Router();
router.post('/', createOrderRoute);
router.get('/', listOrdersRoute); 

export default router;