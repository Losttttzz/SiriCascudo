import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
});

export default characterSchema;