import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
});

export default ingredientSchema;