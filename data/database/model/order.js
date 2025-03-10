import mongoose from 'mongoose';
import characterSchema from './character.js';
import burgerSchema from './burger.js';

const orderSchema = new mongoose.Schema({
  name: String,
  character: characterSchema,
  burgers: [burgerSchema],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;