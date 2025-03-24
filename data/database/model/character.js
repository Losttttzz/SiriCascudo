import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    name: String,
    image: String,
});

export default characterSchema;