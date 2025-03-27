import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
}, { _id: false });

export default ingredientSchema;