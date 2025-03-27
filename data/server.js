import express from 'express';
import orderRoutes from './controllers/order-controller.js';
import { connectDB } from './database/dao.js';
import cors from 'cors'

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/orders', orderRoutes);

connectDB();

app.listen(port, () => {
    console.log(`Siri Cascudo Waiter Server running at port ${port}`);
});