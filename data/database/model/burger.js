import mongoose from 'mongoose';
import ingredientSchema from './ingredient.js';

const burgerSchema = new mongoose.Schema({
    price: Number,
    kcal: Number,
    ingredients: [ingredientSchema],
});

export default burgerSchema;