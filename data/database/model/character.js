import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    name: String,
    imagePath: String,
}, { _id: false });

export default characterSchema;