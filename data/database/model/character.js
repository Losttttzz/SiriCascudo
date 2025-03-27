import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    name: String,
    image: String,
}, { _id: false });

export default characterSchema;